import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const prodConfig = {
  apiKey: process.env.REACT_APP_PROD_API_KEY,
  authDomain: process.env.REACT_APP_PROD_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_PROD_DATABASE_URL,
  projectId: process.env.REACT_APP_PROD_PROJECT_ID,
  storageBucket: process.env.REACT_APP_PROD_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_PROD_MESSAGING_SENDER_ID,
};

const devConfig = {
  apiKey: process.env.REACT_APP_DEV_API_KEY,
  authDomain: process.env.REACT_APP_DEV_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DEV_DATABASE_URL,
  projectId: process.env.REACT_APP_DEV_PROJECT_ID,
  storageBucket: process.env.REACT_APP_DEV_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_DEV_MESSAGING_SENDER_ID,
};

const config =
  process.env.NODE_ENV === 'production' ? prodConfig : devConfig;

const provider = new firebase.auth.GoogleAuthProvider();

class Firebase {
  constructor() {
    app.initializeApp(config);
    //Initialize firebase authentication
    this.auth = app.auth();
    //Initialize firebase database
    this.database = app.database();
  }

  //TODO Auth API

  //Google Signup
  

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
