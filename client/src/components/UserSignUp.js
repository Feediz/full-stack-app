import React, { Component } from "react";
import { Link } from "react-router-dom";
import Form from "./Form";

/**
 * user sign up component
 */
class UserSignUp extends Component {
  state = {
    firstName: "",
    lastName: "",
    emailAddress: "",
    password: "",
    confirmPassword: "",
    errors: [],
  };

  render() {
    const {
      firstName,
      lastName,
      emailAddress,
      password,
      confirmPassword,
      errors,
    } = this.state;

    return (
      <div className="bounds">
        <div className="grid-33 centered signin">
          <h1>Sign Up</h1>
          <Form
            cancel={this.cancel}
            errors={errors}
            submit={this.submit}
            submitButtonText="Sign Up"
            elements={() => (
              <React.Fragment>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  className=""
                  placeholder="First Name"
                  value={firstName}
                  onChange={this.change}
                />

                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  className=""
                  placeholder="Last Name"
                  value={lastName}
                  onChange={this.change}
                />

                <input
                  id="emailAddress"
                  name="emailAddress"
                  type="text"
                  className=""
                  placeholder="Email Address"
                  value={emailAddress}
                  onChange={this.change}
                />

                <input
                  id="password"
                  name="password"
                  type="password"
                  className=""
                  autoComplete="off"
                  placeholder="Password"
                  value={password}
                  onChange={this.change}
                />

                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  className=""
                  autoComplete="off"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={this.change}
                />
              </React.Fragment>
            )}
          />
          <p>
            Already have a user account? <Link to="/signin">Click here</Link> to
            sign in!
          </p>
        </div>
      </div>
    );
  }

  // on change event handler set state with field values
  change = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState(() => {
      return {
        [name]: value,
      };
    });
  };

  // handle form submit
  submit = () => {
    const { context } = this.props;
    const {
      firstName,
      lastName,
      emailAddress,
      password,
      confirmPassword,
    } = this.state;

    const user = {
      firstName,
      lastName,
      emailAddress,
      password,
      confirmPassword,
    };

    context.apiData
      .createUser(user)
      .then((errors) => {
        if (errors.length) {
          this.setState({ errors });
        } else {
          console.log(`User ${emailAddress} was successfully set up.`);
          context.actions.signIn(emailAddress, password).then(() => {
            this.props.history.push("/authenticated");
          });
        }
      })
      .catch((err) => {
        // handle rejected promises
        console.log(err);
        this.props.history.push("/error"); // push to history stack
      });
  };

  // handle cancel request
  cancel = () => {
    this.props.history.push("/");
  };
}

export default UserSignUp;
