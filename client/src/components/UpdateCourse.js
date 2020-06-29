import React, { Component } from "react";
import { Link } from "react-router-dom";
import Form from "./Form";

class UpdateCourse extends Component {
  state = {
    title: "",
    description: "",
    estimatedTime: "",
    materialsNeeded: "",
    userId: 0,
    author: "",
    errors: [],
  };

  componentDidMount() {
    const { context } = this.props;
    const authorInfo = context.authenticatedUser;
    let author = null;

    if (authorInfo) {
      author = `${authorInfo.firstName} ${authorInfo.lastName}`;
    }

    context.apiData
      .getCourse(this.props.match.params.id)
      .then((course) => {
        if (course) {
          this.setState({
            courseDetail: course,
            title: course.title,
            description: course.description,
            estimatedTime: course.estimatedTime,
            materialsNeeded: course.materialsNeeded,
            userId: course.userId,
            author,
          });
        }
      })
      .catch((error) => {
        console.error(error);
        this.setState({ errors: error });
        this.props.history.push("/error");
      });
  }
  render() {
    const {
      errors,
      title,
      author,
      description,
      estimatedTime,
      materialsNeeded,
    } = this.state;

    let _estimatedTime = estimatedTime ? estimatedTime : "";
    let _materialsNeeded = materialsNeeded ? materialsNeeded : "";

    return (
      <div className="bounds course--detail">
        <h1>Update Course</h1>
        <Form
          cancel={this.cancel}
          errors={errors}
          submit={this.submit}
          submitButtonText="Update Course"
          elements={() => (
            <React.Fragment>
              <input
                id="title"
                name="title"
                type="text"
                onChange={this.change}
                className="input-title course--title--input"
                placeholder="Course title..."
                value={title}
              />

              <p>By {author}</p>

              <textarea
                id="description"
                name="description"
                onChange={this.change}
                className=""
                placeholder="Course description..."
                value={description}
              />
              <div className="course--stats">
                <ul className="course--stats--list">
                  <li className="course--stats--list--item">
                    <h4>Estimated Time</h4>
                    <div>
                      <input
                        id="estimatedTime"
                        name="estimatedTime"
                        onChange={this.change}
                        type="text"
                        className="course--time--input"
                        placeholder="Hours"
                        value={_estimatedTime}
                      />
                    </div>
                  </li>
                  <li className="course--stats--list--item">
                    <h4>Materials Needed</h4>
                    <div>
                      <textarea
                        id="materialsNeeded"
                        name="materialsNeeded"
                        onChange={this.change}
                        className=""
                        placeholder="List materials..."
                        value={_materialsNeeded}
                      />
                    </div>
                  </li>
                </ul>
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
    const { courseDetail } = this.state;
    context.apiData
      .updateCourse(this.props.match.params.id, courseDetail)
      .then(() => {
        console.log(`Course updated`);
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

export default UpdateCourse;
