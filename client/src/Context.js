import React, { Component } from "react";
import Cookies from "js-cookie";
import Cryptr from "cryptr";

import ApiData from "./ApiData";

const Context = React.createContext();

const cryptr = new Cryptr("846F7A254644FA21D9B1D844BA8E7");

export class Provider extends Component {
  constructor() {
    super();
    this.apiData = new ApiData();
  }

  state = { authenticatedUser: Cookies.getJSON("authenticatedUser") || null };

  render() {
    const { authenticatedUser } = this.state;

    const value = {
      authenticatedUser,
      apiData: this.apiData,
      getCourses: this.getCourses,
      actions: {
        signIn: this.signIn,
        signOut: this.signOut,
        showNotification: this.createNotification,
      },
    };
    return (
      <Context.Provider value={value}>{this.props.children}</Context.Provider>
    );
  }

  signIn = async (emailAddress, password) => {
    const user = await this.apiData.getUser(emailAddress, password);
    if (user !== null) {
      user.p = cryptr.encrypt(password);
      this.setState(() => {
        return {
          authenticatedUser: user,
        };
      });

      // set cookie
      Cookies.set("authenticatedUser", JSON.stringify(user), { expires: 1 });
    }
    return user;
  };

  getCourses = async () => {
    const courses = await this.apiData.getCourses();
    return courses;
  };

  signOut = () => {
    this.setState({ authenticatedUser: null });
    Cookies.remove("authenticatedUser");
  };
}

export const Consumer = Context.Consumer;

/**
 * A higher-order component that wraps the provided component in a Context Consumer component.
 * @param {class} Component - A React component.
 * @returns {function} A higher-order component.
 */

export default function withContext(Component) {
  return function ContextComponent(props) {
    return (
      <Context.Consumer>
        {(context) => <Component {...props} context={context} />}
      </Context.Consumer>
    );
  };
}
