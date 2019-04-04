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
	doPasswordUpdate = password => this.auth.currentUser.updatePassword(password);
	//Base API call
	userRef = uid => this.database.collection("users").doc(uid);

	hotelRef = uid => this.database.collections("hotels").doc(uid);

	reservationRef = uid => this.database.collection("reservations").doc(uid);

	// *** Merge Auth and DB User API *** //

	onAuthUserListener = (next, fallback) =>
		this.auth.onAuthStateChanged(authUser => {
			if (authUser) {
				this.userRef(authUser.uid)
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

	getAllHotels = () =>
		this.database
			.collection("hotels")
			.get()
			.then(hotels => {
				let result = [];
				hotels.forEach(snapshot => {
					const obj = {
						id: snapshot.id,
						data: {...snapshot.data()}
					};
					result.push(obj);
				});
				return result;
			});

	addUserToDB = (authUser, email, username) => {
		let data = {
			user_id: authUser.user.uid,
			username: username,
			email: email,
			reservations: [],
			reward_points: 0
		};

		return this.userRef(data.user_id)
			.set(data)
			.then(() => {
				console.log("Successfully created account.");
				return this.doSendEmailVerification();
			})
			.catch(error => error);
	};

	editUserAccount = (user_id, data) => {
		this.userRef(user_id)
			.update(data)
			.then(() => {
				console.log("User data was successfully changed");
				return true;
			})
			.catch(error => {
				console.error("Error editing document: ", error);
				return false;
			});
	};

	addReservationToDB = (user_id, data) => {
		//Check that data has valid properties
		if (
			data.hasOwnProperty("user_id") &&
			data.hasOwnProperty("hotel_id") &&
			data.hasOwnProperty("room_id") &&
			data.hasOwnProperty("price") &&
			data.hasOwnProperty("start_date") &&
			data.hasOwnProperty("end_date")
		) {
			//Create new reservation document
			this.database
				.collection("reservations")
				.add(data)
				.then(res_doc => {
					//Add reservation_id to reservation document
					data.reservation_id = res_doc.id;
					this.editReservation(res_doc.id, data);
					//get user's document
					this.userRef(user_id)
						.get()
						.then(user_doc => {
							//add reservation to user's current reservation array
							let new_res = user_doc.data().reservations; //Reference to reservation array
							new_res.push(data.reservation_id); //Adding new reservation_id
							this.editUser(user_id, {reservations: new_res});
						})
						.catch(err => {
							console.log("Failed to get user document.");
							return false;
						});
				})
				.catch(err => {
					console.log("Failed to add new reservation. " + err);
					return false;
				});
			return true;
		} else return false;
	};

	//edit reservation data
	editReservationInfo = (reservation_id, data) => {
		this.reservationRef(reservation_id)
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
		//delete from reservations collection
		this.reservationRef(reservation_id)
			.delete()
			.then(() => {
				console.log(
					"Successfully deleted reservation from reservation collection."
				);
				//delete reservation from users reservations
				this.userRef(user_id)
					.get()
					.then(doc => {
						let user_res = doc.data().reservations; //array of users reservation_id's
						//Update user's reservations
						if (user_res.indexOf(reservation_id) >= 0) {
							user_res.splice(user_res.indexOf(reservation_id), 1); //remove reservation_id from array
							this.editUser(user_id, {reservations: user_res});
						} else {
							console.log("Reservation was not present.");
							return false;
						}
					})
					.catch(err => {
						console.log("Failed to delete reservation from user. " + err);
						return false;
					});
			})
			.catch(err => {
				console.log(
					"Failed to delete reservation from reservation collection. " + err
				);
				return false;
			});
		return true;
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
			let obj = {};
			hotelRef.get().then(snapshot => {
				obj = {
					id: snapshot.id,
					data: {...snapshot.data()}
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
			const isAvailable = hotel.data.rooms.some(room =>
				room.unavailable_dates.every(dateRange => {
					const roomCheck =
						date_end < dateRange.startDate || date_start > dateRange.endDate;
					if (!roomCheck) hotel.data.rooms.pop(room);
					return roomCheck;
				})
			);
			if (isAvailable) {
				result.push(hotel);
			}
		});
		return result;
	};

	updateUnavailableDatetoRoom = (hotel, date_start, date_end) => {
		let availableRoom = hotel[0].data.rooms[0];
		const hotelRef = this.hotelRef(hotel.id);
		//remove the current available room
		hotelRef
			.update({
				rooms: this.firebase.firestore.FieldValue.arrayRemove(availableRoom)
			})
			.then(() => console.log("Successfully Remove available room"))
			.catch(error => console.log(error));
		//Add edited available room
		availableRoom.unavailable_dates.push({startDate: 8, endDate: 8});
		this.hotelRef(hotel.id)
			.update({
				rooms: this.firebase.firestore.FieldValue.arrayUnion(availableRoom)
			})
			.then(() => console.log("Successfully add edited available room"))
			.catch(error => console.log(error));
	};
	/**
	 * filter hotels arrays
	 * @param  {array} hotels          hotels object arrays
	 * @param  {array string} field           the deep of the filter object. Ex: ['room', 'price'] will the{ hotel: { room: { price: 1}}}
	 * 																																			Ex2: ['price'] will filter the {hotel: { price}}
	 * @param  {function} compareFunction function to compare. Ex: (a,b) => a < b
	 * @param  {any} compareValue    value that will be compare to: filter everything larger smaller than 2, compareFunction = (a, b) => a < b, compareValue = 2
	 * @return {array}                 array of hotels
	 */
	filterHotels = (hotels, field, compareFunction, compareValue) => {
		return hotels.filter(hotel => {
			return compareFunction(_.get(hotel, field), compareValue);
		});
	};
	/**
	 * sorted hotels arrays
	 * @param  {array} hotels          hotels object arrays
	 * @param  {array string} field           the deep of the filter object. Ex: ['room', 'price'] will the{ hotel: { room: { price: 1}}}
	 * 																																			Ex2: ['price'] will filter the {hotel: { price}}
	 * @param {boolean} isAscending if true, sort Asccending, if false sort descending
	 * @return {array}                 array of sorted hotels
	 */
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
