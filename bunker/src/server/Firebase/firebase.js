import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';

import Config from './config';

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

  doSignInWithGoogle = () =>
    this.auth.signInWithPopup(this.googleProvider);

  doSignInWithFacebook = () =>
    this.auth.signInWithPopup(this.facebookProvider);

  doSignInWithTwitter = () =>
    this.auth.signInWithPopup(this.twitterProvider);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doSendEmailVerification = (authUser) => {
    authUser.user.sendEmailVerification()
        .then(() => console.log("Verification email sent."))
        .catch(error => error);
  }
    // this.auth.currentUser.sendEmailVerification({
    //   url: config.url,
    // });

  doPasswordUpdate = password =>
    this.auth.currentUser.updatePassword(password);

  // *** Merge Auth and DB User API *** //

  onAuthUserListener = (next, fallback) =>
    this.auth.onAuthStateChanged(authUser => {
      if (authUser) {
        this.user(authUser.uid)
          .once('value')
          .then(snapshot => {
            const dbUser = snapshot.val();

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
              ...dbUser,
            };

            next(authUser);
          });
      } else {
        fallback();
      }
    });

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
    }

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