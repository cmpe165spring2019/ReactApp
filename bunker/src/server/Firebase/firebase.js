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

		this.FieldValue = app.firestore.FieldValue;

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
	user = uid => this.database.collection("users").doc(uid);

	hotelRef = uid => this.database.collection("hotels").doc(uid);

	reservationRef = uid => this.database.collection("reservations").doc(uid);
	reservationsRef = () => this.database.collection("reservations");

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

	addGoogleUserToDB = (socialAuthUser) => {
		return this.user(socialAuthUser.user.uid).set({
			username: socialAuthUser.user.displayName,
			email: socialAuthUser.user.email,
			reservations: this.FieldValue.arrayUnion(""),
			reward_points: this.FieldValue.increment(0),
		},{merge: true})
	}

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
		return this.user(user_id)
			.update(data)
			.then(() => {
				console.log("User data was successfully changed");
				return true;
			})
			.catch(error => error);
	};

checkForConflictWithDates = (new_start, new_end, user_id) => {
	return this.user(user_id)
		.get()
		.then(user_doc => {
			const reservationIDs = user_doc.data().reservations;
			//If reservations exist check for date confilcts
			return this.getReservations(reservationIDs).then(reservations =>
				reservations.every(res => {
					const check =
						new_start < res.data.start_date || new_end > res.data.end_date;
					console.log(
						new_start,
						res.data.start_date,
						new_end,
						res.data.end_date,
						check
					);
					return check;
				})
			);
		});
};


addReservationToDB = (user_id, data) => {
	return this.checkForConflictWithDates(data.start_date, data.end_date, user_id).then((check) => {
		if(check){
			this.reservationsRef()
				.add(data)
				.then(res_doc => {
					this.editUserAccount(user_id, {
						reservations: this.FieldValue.arrayUnion(res_doc.id),
						reward_points: this.FieldValue.increment(Math.floor(data.price / 10))
					});
					return true;
				})
				.catch(error => console.log("Failed to add res " + error));
		}
		else{
			console.log("Cant have multiple booking");
			return false;
		}
	});
};

	//edit reservation data
	editReservationInfo = (reservation_id, data) => {
		return this.reservationRef(reservation_id)
			.update(data)
			.then(() => {
				console.log("Reservation data was successfully changed");
				return true;
			})
			.catch(error => {
				console.error("Error editing document: ", error);
				return error;
			});
	};

	//Delete reservation
	deleteReservationFromDB = (reservation_id, user_id, price) => {
	return this.user(user_id)
		.update({
			reservations: this.FieldValue.arrayRemove(reservation_id),
			reward_points: this.FieldValue.increment(-Math.floor(price / 10))
		})
		.then(() => {
			return this.reservationRef(reservation_id)
				.delete()
				.then(() => {
					console.log("Done delete reservation");
				})
				.catch(err => {
					console.log("Error in delete reservation", err);
					return err;
				});
		})
		.catch(err => {
			console.log("Error in remove reservations id or decrease reward_points");
				return err;
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

subscribeReservations = (userID,
	// start_date,
	doChange, doError) => {
	return this.reservationsRef()
		.where("user_id", "==", userID)
		// .where("start_date", ">=", start_date)
		.onSnapshot(snapshot => {
			let reservations = [];
			snapshot.forEach(doc =>
				reservations.push({id: doc.id, data: doc.data()})
			);
			doChange(reservations);
		},
	(error) => {
		doError(error)
	})
};


	getReservations = reservationIDs => {
		let result = [];
		let promise = [];
		reservationIDs.forEach(reservationID =>
			promise.push(this.reservationRef(reservationID).get())
		);
		return Promise.all(promise).then(snapshots => {
			snapshots.forEach(snapshot => {
				const obj = {
					id: snapshot.id,
					data: snapshot.data()
				};
				result.push(obj);
			});
			return result;
		});
	};

	getHotels = hotelIDs => {
		let promise = hotelIDs.map(hotelID => this.hotelRef(hotelID).get());
		return Promise.all(promise).then(snapshots => {
			let result = snapshots.map(snapshot => ({
					id: snapshot.id,
					data: snapshot.data()
				})
			);
			return result;
		});
	};

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
