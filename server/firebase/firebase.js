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

}

export default Firebase;
