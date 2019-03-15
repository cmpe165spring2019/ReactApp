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

    search = (location, callback) =>
    {
        this.database.collection('locations').doc(location).once('value')
            .then( data => {
                console.log('Successfully fetched rooms from ' + location);
                callback(data);
                return true;})

            .catch( error => {
                console.log("Failed to get hotels " + error);
                return false;
            })
    };

	//*****Reservation API*********
	//add reservation data
	addReservation = (user_id, data) => {
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
					this.database
						.collection("users")
						.doc(user_id)
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
