import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/database';
import Config from './config';

const config = Config;

class Firebase {
  constructor() {
    app.initializeApp(config);
    //Initialize firebase authentication
    this.auth = app.auth();
    //Initialize firebase database
    this.database = app.firestore();
    //Initialize Google Authentication
    this.provider = new app.auth.GoogleAuthProvider();
  }

  //TODO Auth API


  //Google SignIn
  googleSignIn= () => {
    this.auth.signInWithPopup(this.provider).then(result => {
      console.log(result);
      console.log("Google Account Linked");
    }).catch(err => {
      console.log(err);
      console.log("Failed to link.");
    });
  }


  //Google Logout
  googleSignOut = () => {
    this.auth.signOut().then(() => {
      // Sign-out successful.
      console.log("Successfully Logout.");
    }).catch(error => {
      // An error happened.
      console.log("Failed to Logout");
    });
  }
  
  // User API
  //add data
  addData(data, table, fn) {
    if(fn){
      this.database.collection(table).add(data)
      .then((docRef) => {
        console.log("New User was successfully added");
        this.database.collection(table).doc(docRef.id).update({ref_id: docRef.id})  //Add reference id for thsi document
          .then(() => console.log("Reference ID was added"))
          .catch((error) => console.log("Reference ID was not added"));
        return true;
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
        return false;
      })
    }
    else {
      console.log("Failed to add data");
      return false;
    } 
  }

  //Adds reservation_id to users collection
  updateUserReservations(user_id, reservation_id) {
    this.database.collection("users").doc(user_id).get().then((doc) => {
        let new_res = doc.data().reservations;  //Reference to reservation array in users collection
        new_res.push(reservation_id); //add new reservation id
        this.database.collection("users").doc(user_id).update({reservations: new_res}) //update reservation array in collection
          .then(() => console.log("Successfully updated user reservation"))
          .catch((error) => console.error("Error updating reservations: ", error));
    })
  }

  //add user
  addUser(data) {
    if(data.hasOwnProperty("first_name")&&data.hasOwnProperty("last_name")&&data.hasOwnProperty("email"))
      return true;
    else
      return false;
  }

  //edit user data
  editUser(user_id, data) {
    this.database.collection("users").doc(user_id).update(data)
      .then(() => {
        console.log("User data was successfully changed");
        return true;
      })
      .catch((error) => {
        console.error("Error editing document: ", error);
        return false;
      })
  }
  
  //add reservation data
  addReservation(data) {
    if(data.hasOwnProperty("user_id")&&data.hasOwnProperty("hotel_id")&&data.hasOwnProperty("room_id")
    &&data.hasOwnProperty("price")&&data.hasOwnProperty("start_date")&&data.hasOwnProperty("end_date"))
      return true;
    else
      return false;
  }

  //edit reservation data
  editReservation(reservation_id, data) {
    this.database.collection("reservation").doc(reservation_id).update(data)
      .then(() => {
        console.log("Reservation data was successfully changed");
        return true;
      })
      .catch((error) => {
        console.error("Error editing document: ", error);
        return false;
      })
  }
}

export default Firebase;