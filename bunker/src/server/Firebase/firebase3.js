import app from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/database";

import Config from "./config";

const config = Config;

class Firebase {
	constructor() {
		app.initializeApp(config);
		//Initialize firebase authentication
		this.auth = app.auth();
		//Initialize firebase database
		this.database = app.firestore();
		//Initialize Google Authentication
		this.googleProvider = new app.auth.GoogleAuthProvider();
	}

	//Auth API
	//Google SignIn
	googleSignIn = () => {
		this.auth
			.signInWithPopup(this.googleProvider)
			.then(result => {
				console.log(result);
				console.log("Google Account Linked");
			})
			.catch(err => {
				console.log(err);
				console.log("Failed to link.");
			});
	};

	signIn = (email, password) => {
		this.auth.signInWithEmailAndPassword(email, password).catch(error => {
			return error;
		});
	};

	//Google Logout
	signOut = () => {
		this.auth.signOut().catch(error => {
			return error;
		});
	};

	createAccount = (email, password, data) => {
		this.auth
			.createUserWithEmailAndPassword(email, password)
			.then(authUser => {
				data.user_id = authUser.user.uid;
				data.reservations = [];
				data.reward_points = 0;
				this.database
					.collection("users")
					.doc(data.user_id)
					.set(data)
					.then(console.log("Successfully created account."))
					.catch(error => error);
			})
			.catch(error => {
				return error;
			});
	};

	// ******User API**********
	//edit user data
	editUser = (user_id, data) => {
		this.database
			.collection("users")
			.doc(user_id)
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

	getCities = () =>
		this.firestore
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

	//*****Reservation API*********
	//add reservation data
	addReservation = (user_id, data) => {
		//Check that data has valid properties
		//get user's document
		let user;
		this.database
			.collection("users")
			.doc(user_id)
			.get()
			.then(snapshot => {
				user = {
					id: snapshot.id,
					data: snapshot.data()
				};
			})
			.catch(error => error("Users not exits"));
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
					let new_res = user.data.reservations;
					new_res.push(data.reservation_id);
					this.editUser(user_id, {reservation: new_res});
				})
				.catch(err => {
					console.log("Failed to add new reservation. " + err);
					return false;
				});
			return true;
		} else return false;
	};

	//edit reservation data
	editReservation = (reservation_id, data) => {
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
	deleteReservation = (reservation_id, user_id) => {
		//delete from reservations collection
		this.database
			.collection("reservations")
			.doc(reservation_id)
			.delete()
			.then(() => {
				console.log(
					"Successfully deleted reservation from reservation collection."
				);
				//delete reservation from users reservations
				this.database
					.collection("users")
					.doc(user_id)
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
}

export default Firebase;
