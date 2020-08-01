import React from "react";

export default (props) => {
  const { cancel, errors, submit, submitButtonText, elements } = props;

  // handle submit button
  function handleSubmit(e) {
    e.preventDefault();
    submit();
  }

  // handle cancel request
  function handleCancel(e) {
    e.preventDefault();
    cancel();
  }

  return (
    <div>
      <ErrorsDisplay errors={errors} />
      <form onSubmit={handleSubmit}>
        {elements()}
        <div className="">
          <button className="button" type="submit">
            {submitButtonText}
          </button>
          <button className="button button-secondary" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

/**
 * Handles display of error html
 * @param {array} errors
 */
function ErrorsDisplay({ errors }) {
  let errorsDisplay = null;

  if (errors.length > 0) {
    errorsDisplay = (
      <div>
        <h2 className="validation--errors--label">Validation errors</h2>
        <div className="validation-errors">
          <ul>
            {errors.map((error, i) => (
              <li key={i}>{error}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  return errorsDisplay;
}
