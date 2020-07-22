import React from "react";

/**
 * generic component to display page/resource not found page
 * @param {object} props
 */
const NotFound = (props) => {
  return (
    <div className="bounds">
      <h1>Not Found</h1>
      <p>The page you are looking for doesn't exist. Please try again</p>
    </div>
  );
};

export default NotFound;
