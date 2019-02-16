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
    * @todo Google Single Sign-up
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
