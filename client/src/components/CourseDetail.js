import React, { Component } from "react";
import { Link } from "react-router-dom";

// update and delete buttons
import ActionButtons from "./ActionButtons";

/**
 * Retrieve and displays course details for the given id
 * from REST API
 */
class CourseDetail extends Component {
  state = {
    courseDetail: [],
    authenticatedUserEmail: "",
    author: "",
    courseOwnerEmail: "",
    errors: [],
  };

  componentDidMount() {
    const { context } = this.props;

    context.apiData
      .getCourse(this.props.match.params.id)
      .then((course) => {
        // try to grab authenticated user's email
        let authEmail = "";
        if (context.authenticatedUser !== null) {
          authEmail = context.authenticatedUser.emailAddress;
        }

        // if we do a have course details returned from the API
        // add the information to the state
        if (course && course !== "Not found") {
          this.setState({
            courseDetail: course,
            author: course.user.firstName + " " + course.user.lastName,
            courseOwnerEmail: course.user.emailAddress,
            authenticatedUserEmail: authEmail,
          });
        } else {
          // if the course does not exist
          // redirect user to not found page
          console.log("Course not found");
          this.props.history.push("/notfound");
        }
      })
      .catch((error) => {
        // if we have a server error redirect user to error page
        console.dir(error);
        this.setState({ errors: error });
        this.props.history.push("/error");
      });
  }

  render() {
    // we grab the variables we need from the state
    const {
      author,
      courseDetail,
      authenticatedUserEmail,
      courseOwnerEmail,
    } = this.state;

    return (
      <div>
        <div className="actions--bar">
          <div className="bounds">
            <div className="grid-100">
              <ActionButtons
                id={courseDetail.id}
                authEmail={authenticatedUserEmail}
                courseEmail={courseOwnerEmail}
                deleteFunction={this.deleteCourse}
              />
              <Link className="button button-secondary" to="/">
                Return to List
              </Link>
            </div>
          </div>
        </div>
        <div className="bounds course--detail">
          <div className="grid-66">
            <div className="course--header">
              <h4 className="course--label">Course</h4>
              <h3 className="course--title">{courseDetail.title}</h3>
              <p>By {author}</p>
            </div>
            <div className="course--description">
              <p>{courseDetail.description}</p>
            </div>
          </div>

          <div className="grid-25 grid-right">
            <div className="course--stats">
              <ul className="course--stats--list">
                <li className="course--stats--list--item">
                  <h4>Estimated Time</h4>
                  <h3>{courseDetail.estimatedTime}</h3>
                </li>
                <li className="course--stats--list--item">
                  <h4>Materials Needed</h4>
                  <ul>{courseDetail.materialsNeeded}</ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
  /**
   * handle when user clicks delete button
   */
  deleteCourse = () => {
    const { context } = this.props;

    // grab course id from the state
    const id = this.state.courseDetail.id;

    // authenticated user data
    const userDetail = context.authenticatedUser;

    // delete course
    context.apiData.deleteCourse(id, userDetail).then((errors) => {
      // if we have errors, we set the errors state variables
      if (errors) {
        console.error(`Error: ${errors}`);
        this.setState({ errors });
      } else {
        // if course is deleted, we redirect user to home page
        console.log("Course deleted!");
        this.props.history.push(`/courses`);
      }
    });
  };
}

export default CourseDetail;
