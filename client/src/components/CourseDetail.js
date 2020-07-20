import React, { Component } from "react";
import { Link } from "react-router-dom";

import ActionButtons from "./ActionButtons";

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
        let authEmail = "";
        if (context.authenticatedUser !== null) {
          authEmail = context.authenticatedUser.emailAddress;
        }
        if (course && course !== "Not found") {
          this.setState({
            courseDetail: course,
            author: course.user.firstName + " " + course.user.lastName,
            courseOwnerEmail: course.user.emailAddress,
            authenticatedUserEmail: authEmail,
          });
        } else {
          console.log("Course not found");
          this.props.history.push("/notfound");
        }
      })
      .catch((error) => {
        console.dir(error);
        this.setState({ errors: error });
        this.props.history.push("/error");
      });
  }

  render() {
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
  deleteCourse = () => {
    const { context } = this.props;
    const id = this.state.courseDetail.id;
    const userDetail = context.authenticatedUser;

    // const { addToast } = useToasts();

    context.apiData.deleteCourse(id, userDetail).then((errors) => {
      if (errors) {
        console.error(`Error: ${errors}`);
        this.setState({ errors });
      } else {
        console.log("Course deleted!");
        context.msg = "Course deleted";
        this.props.history.push(`/courses`);
      }
    });
    console.log("NEEW DELETE");
  };
}

export default CourseDetail;
