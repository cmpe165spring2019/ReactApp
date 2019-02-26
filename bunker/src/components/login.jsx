import React, { Component } from "react";
import { withFirebase } from "../firebase";
import * as Schema from "./example";

class Login extends Component {
  state = {
    count: 0,
    user: { ...Schema.user },
    imageUrl: "http://i44.tinypic.com/2b5lyr.jpg"
  };

  SignIn() {
    // this is sign in function
    console.log("sign in");
    this.props.firebase.googleSignIn().catch(error => {
      console.log(error);
    });
  }
  Login() {
    // this is login function
    console.log("login");
  }
  Logout() {
    // this is Logout function
    console.log("logout");
  }

  render() {
    React.createElement("div");
    return (
      <div>
        <h1>This is Login Page</h1>

        <label htmlFor="fname">
          <b>First Name</b>
        </label>
        <input type="text" placeholder="First Name" name="fname" required />
        <br />
        <label htmlFor="psw">
          <b>Last Name</b>
        </label>
        <input type="password" placeholder="Last Name" name="lname" required />
        <br />
        <button onClick={() => this.SignIn()}> Sign In </button>
        <br />
        <button onClick={() => this.Login()}> Login</button>
        <br />
        <button onClick={() => this.Logout()}> Log Out</button>
      </div>
      //<div>
      //<a href="/test">
      //<img src={this.state.imageUrl} alt="" />
      //</a>
      //<span>{this.formatCount()}</span>
      //<button>Increment</button>
      //</div>
    );
  }

  formatCount() {
    return this.state.count === 0 ? "Zero" : this.state.count;
  }
}

export default withFirebase(Login);
