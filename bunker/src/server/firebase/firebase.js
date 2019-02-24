import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import Config from './config';


const config = Config;
class Firebase {
  constructor() {
    app.initializeApp(config);
    //Initialize firebase authentication
    this.auth = app.auth();
    //Initialize firebase database
    this.database = app.database();
    //Initialize Google Authentication
    this.provider = new app.auth.GoogleAuthProvider();
  }

  //TODO Auth API


  //Google SignIn
  googleSignIn= () => {
    this.auth().signInWithPopup(this.provider).then(result => {
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

}

export default Firebase;
