import React from "react";
import { Redirect } from "react-router-dom";

/**
 * user sign out component
 * @param {array} context
 */
const UserSignOut = ({ context }) => {
  context.actions.signOut();
  return <Redirect to="/" />;
};

export default UserSignOut;
