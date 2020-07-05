import React, { Component } from "react";
import Form from "./Form";

class CreateCourse extends Component {
  state = {
    title: "",
    description: "",
    estimatedTime: "",
    materialsNeeded: "",
    errors: [],
  };
  render() {
    const {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      errors,
    } = this.state;

    let _estimatedTime = estimatedTime ? estimatedTime : "";
    let _materialsNeeded = materialsNeeded ? materialsNeeded : "";

    return (
      <div className="bounds course--detail">
        <h1>Create Course</h1>
        <Form
          cancel={this.cancel}
          errors={errors}
          submit={this.submit}
          submitButtonText="Create Course"
          elements={() => (
            <React.Fragment>
              <div className="course--header">
                <h4 className="course--label">Course</h4>
                <input
                  id="title"
                  name="title"
                  type="text"
                  className="input-title course--title--input"
                  placeholder="Course title..."
                  onChange={this.change}
                  value={title}
                />
                <p>By Joe Smith</p>
              </div>

              <div className="course--description">
                <textarea
                  id="description"
                  name="description"
                  className=""
                  placeholder="Course description..."
                  onChange={this.change}
                  value={description}
                />
              </div>

              <div className="course--stats--list">
                <h4>Estimated Time</h4>
                <input
                  id="estimatedTime"
                  name="estimatedTime"
                  type="text"
                  className="course--time--input"
                  placeholder="Hours"
                  onChange={this.change}
                  value={_estimatedTime}
                />

                <h4>Materials Needed</h4>
                <textarea
                  id="materialsNeeded"
                  name="materialsNeeded"
                  className=""
                  placeholder="List materials..."
                  onChange={this.change}
                  value={_materialsNeeded}
                />
              </div>
            </React.Fragment>
          )}
        />
      </div>
    );
  }

  change = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    this.setState(() => {
      return {
        [name]: value,
      };
    });
  };

  submit = () => {
    const { context } = this.props;
    const userId = context.authenticatedUser.id;
    let { title, description, estimatedTime, materialsNeeded } = this.state;
    let courseDetail = {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      userId,
    };

    const userDetail = context.authenticatedUser;

    context.apiData
      .createCourse(courseDetail, userDetail)
      .then(() => {
        console.log(`Course added`);
      })
      .catch((err) => {
        console.error(err);
        this.props.history.push("/error");
      });
  };

  cancel = () => {
    this.props.history.push("/");
  };
}

export default CreateCourse;
