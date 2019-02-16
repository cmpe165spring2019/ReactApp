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

class Firebase {
  constructor() {
    app.initializeApp(config);
    //Initialize firebase authentication
    this.auth = app.auth();
    //Initialize firebase database
    this.database = app.database();
  }


  //TODO Auth API

  /*
  * @todo Google Single Sign-up
  * @body Create user with Google account function
  * DueDay: Sunday 2/17/2019
  * the format is
  *   apiFunction = (parameter) =>
      this.auth.firebasefunctiontoSignUpwithGoogle(parameter);
  *
   */


   /*
   * @todo Google Single Sign-In
   * @body Log In user with Google account function
   * DueDay: Sunday 2/17/2019
   * the format is
   *   apiFunction = (parameter) =>
       this.auth.firebasefunctiontoSignUpwithGoogle(parameter);
   *
    */

    /*
    * @todo Google Single Log Out
    * @body Log user from Google account function
    * DueDay: Sunday 2/17/2019
    * the format is
    *   apiFunction = (parameter) =>
        this.auth.firebasefunctiontoSignUpwithGoogle(parameter);
    *
     */

  // User API

}

export default Firebase;
