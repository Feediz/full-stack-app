import React from "react";

/**
 * generic component to display server error page
 * @param {object} props
 */
const UnhandledError = (props) => {
  return (
    <div className="bounds">
      <h1>Error</h1>
      <p>Sorry! We just encountered an unexpected error.</p>
    </div>
  );
};

export default UnhandledError;
