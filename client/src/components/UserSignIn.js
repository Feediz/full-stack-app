import React, { Component } from "react";
import { Link } from "react-router-dom";
import Form from "./Form";

/**
 * component to show login page
 */
class UserSignIn extends Component {
  state = {
    emailAddress: "",
    password: "",
    id: -1,
    errors: [],
  };
  render() {
    const { emailAddress, password, errors } = this.state;
    return (
      <div className="bounds">
        <div className="grid-33 centered signin">
          <h1>Sign In</h1>
          <Form
            cancel={this.cancel}
            errors={errors}
            submit={this.submit}
            submitButtonText="Sign In"
            elements={() => (
              <React.Fragment>
                <input
                  id="emailAddress"
                  name="emailAddress"
                  type="text"
                  className=""
                  onChange={this.change}
                  placeholder="Email Address"
                  value={emailAddress}
                />
                <input
                  id="password"
                  name="password"
                  type="password"
                  className=""
                  onChange={this.change}
                  placeholder="Password"
                  autoComplete="off"
                  value={password}
                />
              </React.Fragment>
            )}
          />
          <p>
            Don't have a user account? <Link to="/signup">Click here</Link> to
            sign up!
          </p>
        </div>
      </div>
    );
  }

  // on change event handler set state with field values
  change = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    this.setState(() => {
      return {
        [name]: value,
      };
    });
  };

  // handle submit button
  submit = () => {
    const { context } = this.props;
    const { from } = this.props.location.state || {
      from: { pathname: "/" },
    };
    const { emailAddress, password } = this.state;
    context.actions
      .signIn(emailAddress, password)
      .then((user) => {
        if (user === null) {
          this.setState(() => {
            return { errors: ["Sign-in was unsuccessful"] };
          });
        } else {
          console.log(`Success! ${emailAddress} is now signed in.`);
          this.props.history.push(from);
        }
      })
      .catch((err) => {
        console.log(err);
        this.props.history.push("/error");
      });
  };

  // handle cancel request
  cancel = () => {
    this.props.history.push("/");
  };
}

export default UserSignIn;
