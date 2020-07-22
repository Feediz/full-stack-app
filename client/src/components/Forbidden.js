import React from "react";

/**
 * generic component to display permission denied page
 * @param {object} props
 */
const Forbidden = (props) => {
  return (
    <div className="bounds">
      <h1>Forbidden</h1>
      <p>Oh oh! You can't access this page.</p>
    </div>
  );
};

export default Forbidden;
