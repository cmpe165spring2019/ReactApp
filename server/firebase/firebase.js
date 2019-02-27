import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';


const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
};

class Firebase {
  constructor() {
    app.initializeApp(config);
    //Initialize firebase authentication
    this.auth = app.auth();
    //Initialize firebase database
    this.database = app.database();
    //Initialize Google Authentication
    this.provider = app.auth.GoogleAuthProvider();
  }

  //TODO Auth API


  //Google SignIn
  googleSignIn= () => {
    this.auth().signInWithPopup(provider).then(result => {
      console.log(result);
      console.log("Google Account Linked");
    }).catch(err => {
      console.log(err);
      console.log("Failed to link.");
    });
  }


  //Google Logout
  googleSignOut = () => {
    this.auth().signOut().then(() => {
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
      this.collection(table).add(data)
      .then(() => {
        console.log("New User was successfully added");
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

  //add user
  addUser(data) {
    if(data.hasOwnProperty("first_name")&&data.hasOwnProperty("last_name")&&data.hasOwnProperty("email"))
      return true;
    else
      return false;
  }

  //edit user data
  editUser(user_id, data) {
    this.collection("users").doc(user_id).update(data)
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
    &&data.hasOwnProperty("room_id")&&data.hasOwnProperty("price")&&data.hasOwnProperty("star_date")
    &&data.hasOwnProperty("end_date"))
      return true;
    else
      return false;
  }
}

export default Firebase;
