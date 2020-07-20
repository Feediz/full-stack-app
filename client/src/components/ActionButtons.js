import React from "react";
import { Link } from "react-router-dom";

const ActionButtons = (props) => {
  const { id, courseEmail, authEmail, deleteFunction } = props;
  let updateLink,
    deleteLink = "";

  if (courseEmail === authEmail) {
    updateLink = (
      <Link className="button" to={`/courses/${id}/update`}>
        Update Course
      </Link>
    );

    deleteLink = (
      <button className="button" onClick={deleteFunction}>
        Delete Course
      </button>
    );
  }

  return (
    <span>
      {updateLink}
      {deleteLink}
    </span>
  );
};

export default ActionButtons;
