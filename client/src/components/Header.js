import React from "react";
import { Link } from "react-router-dom";

/**
 * header component
 * @param {object} props
 */
const Header = (props) => {
  const { context } = props;
  const authUser = context.authenticatedUser;

  return (
    <header className="App-header">
      <div className="header">
        <div className="bounds">
          <h1 className="header--logo">
            <Link to="/">Courses</Link>
          </h1>
          <nav>
            {authUser ? (
              <React.Fragment>
                <span>
                  {" "}
                  Welcome, {authUser.firstName} {authUser.lastName}
                </span>
                <Link to="/signout">Sign Out</Link>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Link to="/signup" className="signup">
                  Sign Up
                </Link>
                <Link to="/signin" className="signin">
                  Sign In
                </Link>
              </React.Fragment>
            )}
          </nav>
        </div>
      </div>
      <hr />
    </header>
  );
};

export default Header;
