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
    this.googleProvider = new app.auth.GoogleAuthProvider();
  }

  //Auth API
  //Google SignIn
  googleSignIn= () => 
  {
    this.auth.signInWithPopup(this.googleProvider).then(result => {
      console.log(result);
      console.log("Google Account Linked");
    }).catch(err => {
      console.log(err);
      console.log("Failed to link.");
    });
  }

  signIn = (email, password) => 
  {
    this.auth.signInWithEmailAndPassword(email, password)
      .catch(error => {
       console.log("Error: "+error.code+" "+error.message);
      });
  }

  //Google Logout
  signOut = () => 
  {
    this.auth.signOut().then(() => {
      console.log("Successfully Logout.");
    }).catch(error => {
      console.log("Failed to Logout");
    });
  }

  createAccount = (email, password, data) => 
  {
    this.auth.createUserWithEmailAndPassword(email, password)
      .then(authUser => {
        data.user_id = authUser.user.uid;
        this.database.collection('users').doc(data.user_id).set(data)
          .then(console.log("Successfully created account."))
          .catch(error => console.log("Failed to creat account "+error));
      })
      .catch(error => {
        console.log(error);
      });
  }
  
  // User API

  //add user
  addUser = (data) => 
  {
    if(data.hasOwnProperty("first_name")&&data.hasOwnProperty("last_name")&&data.hasOwnProperty("email"))
      return true;
    else
      return false;
  }

  //edit user data
  editUser = (user_id, data) => 
  {
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
  addReservation = (data) => 
  {
    if(data.hasOwnProperty("user_id")&&data.hasOwnProperty("hotel_id")&&data.hasOwnProperty("room_id")
    &&data.hasOwnProperty("price")&&data.hasOwnProperty("start_date")&&data.hasOwnProperty("end_date"))
      return true;
    else
      return false;
  }

  //edit reservation data
  editReservation = (reservation_id, data) => 
  {
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