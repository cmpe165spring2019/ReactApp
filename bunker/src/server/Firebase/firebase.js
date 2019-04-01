import app from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/firestore";

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

	user = uid =>
		this.database
			.collection("users")
			.doc(uid)
			.get();

	doPasswordUpdate = password => this.auth.currentUser.updatePassword(password);

	// *** Merge Auth and DB User API *** //

	onAuthUserListener = (next, fallback) =>
		this.auth.onAuthStateChanged(authUser => {
			if (authUser) {
				this.user(authUser.uid).then(snapshot => {
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

	addUserToDB = (authUser, email, username, isAdmin) => {
		let data = {
			user_id: authUser.user.uid,
			username: username,
			email: email,
			isAdmin: isAdmin,
			reservations: [],
			reward_points: 0
		};

		this.database
			.collection("users")
			.doc(data.user_id)
			.set(data)
			.then(console.log("Successfully created account."))
			.catch(error => error);

		return;
	};

	editUserAccount = (user_id, data) => {
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

	//location
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
}

export default Firebase;
