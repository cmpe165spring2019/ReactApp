import app from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/firestore";
import _ from "lodash";

import Config from "./config";

const config = Config;
class Firebase {
	constructor() {
		app.initializeApp(config);

		/* Helper */

		this.serverValue = app.database.ServerValue;
		this.emailAuthProvider = app.auth.EmailAuthProvider;

		/* Firebase APIs */

		this.auth = app.auth();
		//this.db = app.database();
		this.database = app.firestore();

		/* Social Sign In Method Provider */

		this.googleProvider = new app.auth.GoogleAuthProvider();
		this.facebookProvider = new app.auth.FacebookAuthProvider();
		this.twitterProvider = new app.auth.TwitterAuthProvider();
	}

	// *** Auth API ***

	doCreateUserWithEmailAndPassword = (email, password) =>
		this.auth.createUserWithEmailAndPassword(email, password);

	doSignInWithEmailAndPassword = (email, password) =>
		this.auth.signInWithEmailAndPassword(email, password);

	doSignInWithGoogle = () => this.auth.signInWithPopup(this.googleProvider);

	doSignInWithFacebook = () => this.auth.signInWithPopup(this.facebookProvider);

	doSignInWithTwitter = () => this.auth.signInWithPopup(this.twitterProvider);

	doSignOut = () => this.auth.signOut();

	doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

	doSendEmailVerification = () => {
		this.auth.currentUser
			.sendEmailVerification({
				url: config.url
			})
			.then(() => console.log("Verification email sent."))
			.catch(error => error);
	};

	user = uid => this.database.collection("users").doc(uid);

	doPasswordUpdate = password => this.auth.currentUser.updatePassword(password);

	// *** Merge Auth and DB User API *** //

	onAuthUserListener = (next, fallback) =>
		this.auth.onAuthStateChanged(authUser => {
			if (authUser) {
				this.user(authUser.uid)
					.get()
					.then(snapshot => {
						const dbUser = snapshot.data();

						// default empty roles
						if (!dbUser.roles) {
							dbUser.roles = [];
						}

						// merge auth and db user
						authUser = {
							uid: authUser.uid,
							email: authUser.email,
							emailVerified: authUser.emailVerified,
							providerData: authUser.providerData,
							...dbUser
						};

						next(authUser);
					});
			} else {
				fallback();
			}
		});

	// *** Database API *** //

	addUserToDB = (authUser, email, username) => {
		const data = {
			user_id: authUser.user.uid,
			username: username,
			email: email,
			reservations: [],
			reward_points: 0
		};

		return this.user(data.user_id)
			.set(data)
			.then(() => {
				console.log("Successfully created account.");
				return this.doSendEmailVerification();
			})
			.catch(error => error);
	};

	editUserAccount = (user_id, data) => {
		this.user(user_id)
			.update(data)
			.then(() => {
				console.log("User data was successfully changed");
				return true;
			})
			.catch(error => error);
	};

	checkForConflictWithDates = (new_start, new_end, user_id) => {
		this.user(user_id)
			.get()
			.then(user_doc => {
				const current_reservations = user_doc.data().reservations;
				//If reservations exist check for date confilcts
				if(current_reservations.length >= 1){
					current_reservations
						.forEach(res_id => {
							this.database
								.collection("reservations")
								.doc(res_id)
								.get()
								.then(res_doc => {
									const existing_start = res_doc.data().start_date;
									const existing_end = res_doc.data().end_date;
									if((new_start>=existing_start&&new_start<existing_end)//new start date is between existing date range
										||(new_end>existing_start&&new_end<=existing_end)//new end date is between existing date range
										||(new_start>=existing_start&&new_end<=existing_end)//new date range is within existing date range
										||(new_start<=existing_start&&new_end>=existing_end))//new range encapsulate existing range
									{	
										return false;
									}
								});
						});
				}
			});
		return true;
	}

	addReservationToDB = (user_id, data) => {
		if(this.checkForConflictWithDates(data.start_date, data.end_date, user_id)){
			//Create new reservation document
			this.database
				.collection("reservations")
				.add(data)
				.then(res_doc => {
					//Add reservation_id to reservation document
					data.reservation_id = res_doc.id;
					this.editReservationInfo(res_doc.id, data);
					//get user's document
					this.user(user_id)
						.get()
						.then(user_doc => {
							//add reservation to user's current reservation array
							let new_res = user_doc.data().reservations; //Reference to reservation array
							new_res.push(data.reservation_id); //Adding new reservation_id
							//Update rewards points
							let new_points = user_doc.data().reward_points + Math.floor(data.price/10);
							this.editUserAccount(user_id, {reservations: new_res, reward_points: new_points});
							return true;
						})
						.catch(error => console.log("Failed to add to user " +error));
				})
				.catch(error => console.log("Failed to add res " +error));
		}
		return false;
	};

	//edit reservation data
	editReservationInfo = (reservation_id, data) => {
		this.database
			.collection("reservations")
			.doc(reservation_id)
			.update(data)
			.then(() => {
				console.log("Reservation data was successfully changed");
				return true;
			})
			.catch(error => {
				console.error("Error editing document: ", error);
				return false;
			});
	};

	//Delete reservation
	deleteReservationFromDB = (reservation_id, user_id) => {
		//Delete reservation from user and reservation collection
		this.database
			.collection("reservations")
			.doc(reservation_id)
			.delete()
			.then(() => {
				console.log(
					"Successfully deleted reservation from reservation collection."
				);
				//delete reservation from users reservations
				this.user(user_id)
					.get()
					.then(user_doc => {
						let user_res = user_doc.data().reservations; //array of users reservation_id's
						//Update user's reservations
						if (user_res.indexOf(reservation_id) >= 0) {
							user_res.splice(user_res.indexOf(reservation_id), 1); //remove reservation_id from array
							this.editUserAccount(user_id, {reservations: user_res, reward_points: new_points});
							return true;
						} else {
							console.log("Reservation was not present.");
							return false;
						}
					})
					.catch(error => {
						console.log("Failed to delete reservation from user. " + error);
						return false;
					});
			})
			.catch(error => {
				console.log(
					"Failed to delete reservation from reservation collection. " + error);
				return false;
			});
	};

	//location Search function
	getCities = next =>
		this.database
			.collection("locations")
			.get()
			.then(snapshot => {
				let cities = [];
				snapshot.forEach(city => {
					const obj = {
						id: city.id,
						data: {...city.data()}
					};
					cities.push(obj);
				});

				return cities;
			});

	//Data Retrive and filter
	getLocationHotel = location => {
		let hotels = [];
		location.data.hotels.forEach(hotelRef => {
			hotelRef.get().then(hotel => {
				const obj = {
					id: hotel.id,
					data: {...hotel.data()}
				};
				hotels.push(obj);
			});
		});
		return hotels;
	};

	getHotelsRoomTypeSearch = (hotels, room_types) => {
		let result = [];
		hotels.forEach(hotel => {
			const check = room_types.every(room_type =>
				hotel.data.room_types.includes(room_type)
			);
			if (check) result.push(hotel);
		});
		return result;
	};

	getHotelRoomAvailableDate = (hotels, date_start, date_end) => {
		let result = [];
		hotels.forEach(hotel => {
			const isAvaliable = hotel.data.rooms.some(room =>
				room.unavailable_dates.every(dateRange => {
					const roomCheck =
						date_end < dateRange.startDate || date_start > dateRange.endDate;
					if (!roomCheck) hotel.data.rooms.pop(room);
					return roomCheck;
				})
			);
			if (isAvaliable) {
				result.push(hotel);
			}
		});
		return result;
	};

	updateUnavailableDatetoRoom = (hotel, date_start, date_end) => {
		let availableRoom = hotel[0].data.rooms[0];
		const hotelRef = this.database.collection("hotels").doc(hotel.id);
		//remove the current available room
		hotelRef
			.update({
				rooms: this.firebase.firestore.FieldValue.arrayRemove(availableRoom)
			})
			.then(() => console.log("Successfully Remove available room"))
			.catch(error => console.log(error));
		//Add edited available room
		availableRoom.unavailable_dates.push({startDate: 8, endDate: 8});
		this.database
			.collection("hotels")
			.doc(hotel.id)
			.update({
				rooms: this.firebase.firestore.FieldValue.arrayUnion(availableRoom)
			})
			.then(() => console.log("Successfully add edited available room"))
			.catch(error => console.log(error));
	};

	filterHotels = (hotels, field, compareFunction, compareValue) => {
		return hotels.filter(hotel => {
			return compareFunction(_.get(hotel, field), compareValue);
		});
	};
	sortHotels = (hotels, field, isAscending = true) => {
		let type = typeof _.get(hotels[0], field);
		let compareFunction;
		if (type === "string") {
			compareFunction = (a, b) => {
				var stringA = _.get(a, field).toUpperCase(); // ignore upper and lowercase
				var stringB = _.get(b, field).toUpperCase(); // ignore upper and lowercase
				if (stringA < stringB) {
					return -1;
				}
				if (stringA > stringB) {
					return 1;
				}
				// names must be equal
				return 0;
			};
		} else {
			compareFunction = (a, b) => _.get(a, field) - _.get(b, field);
		}
		if (isAscending) {
			return hotels.sort(compareFunction);
		} else return hotels.sort(compareFunction).reverse();
	};
}

export default Firebase;