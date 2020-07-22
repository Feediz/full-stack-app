import React, { Component } from "react";
import Form from "./Form";

/**
 * component to update course info
 */
class UpdateCourse extends Component {
  state = {
    title: "",
    description: "",
    estimatedTime: "",
    materialsNeeded: "",
    userId: 0,
    author: "",
    authorEmail: "",
    errors: [],
  };

  componentDidMount() {
    const { context } = this.props;
    const authenticatedUserEmail = context.authenticatedUser.emailAddress;

    // call rest api to get course data by course id
    context.apiData
      .getCourse(this.props.match.params.id)
      .then((course) => {
        if (course && course.user.emailAddress !== authenticatedUserEmail) {
          this.props.history.push("/forbidden");
          return null;
        }

        // if we find the course then we set that data in the state
        if (course && course !== "Not found") {
          this.setState({
            courseDetail: course,
            title: course.title,
            description: course.description,
            estimatedTime: course.estimatedTime,
            materialsNeeded: course.materialsNeeded,
            userId: course.userId,
            //authenticatedUserEmail,
            author: course.user.firstName + " " + course.user.lastName,
          });
        } else {
          // if no data then redirect user to not found page
          console.log("Course not found");
          this.props.history.push("/notfound");
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

    // set variables for the estimated time and materials needed fields
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

  // on change event handler set state with field values
  change = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    this.setState(() => {
      return {
        [name]: value,
      };
    });
  };

  // handle submit button
  submit = () => {
    const { context } = this.props;
    let { title, description, estimatedTime, materialsNeeded } = this.state;
    let id = this.state.courseDetail.id;
    const userId = context.authenticatedUser.id;
    let courseDetail = {
      id,
      title,
      description,
      estimatedTime,
      materialsNeeded,
      userId,
    };
    const userDetail = context.authenticatedUser;

    context.apiData
      .updateCourse(id, courseDetail, userDetail)
      .then((errors) => {
        if (errors) {
          console.log(`There is an error | ${errors.errors}`);
          this.setState({ errors: errors.errors });
        } else {
          console.log(`Course updated`);
          this.props.history.push(`/courses/${id}`);
        }
      })
      .catch((err) => {
        console.error(err);
        this.props.history.push("/error");
      });
  };

  // handle request cancel
  cancel = () => {
    this.props.history.push("/");
  };
}

export default UpdateCourse;
