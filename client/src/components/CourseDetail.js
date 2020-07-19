import React, { Component } from "react";
import { Link } from "react-router-dom";

class CourseDetail extends Component {
  state = {
    courseDetail: [],
    author: "",
    errors: [],
  };

  componentDidMount() {
    const { context } = this.props;

    context.apiData
      .getCourse(this.props.match.params.id)
      .then((course) => {
        if (course && course !== "Not found") {
          this.setState({
            courseDetail: course,
            author: course.user.firstName + " " + course.user.lastName,
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
    const { author, courseDetail } = this.state;
    return (
      <div>
        <div className="actions--bar">
          <div className="bounds">
            <div className="grid-100">
              <span>
                <Link
                  className="button"
                  to={`/courses/${courseDetail.id}/update`}
                >
                  Update Course
                </Link>
                <Link className="button" to={`/courses/${courseDetail.id}`}>
                  Delete Course
                </Link>
              </span>
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
}

export default CourseDetail;
