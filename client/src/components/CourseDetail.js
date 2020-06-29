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
    const authorInfo = context.authenticatedUser;
    let author = null;
    if (authorInfo) {
      author = authorInfo.firstName + " " + authorInfo.lastName;
    }

    context.apiData
      .getCourse(this.props.match.params.id)
      .then((course) => {
        if (course) {
          this.setState({
            courseDetail: course,
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
    return (
      <div>
        <div className="actions--bar">
          <div className="bounds">
            <div className="grid-100">
              <span>
                <Link
                  className="button"
                  to={`/courses/${this.state.courseDetail.id}/update`}
                >
                  Update Course
                </Link>
                <Link
                  className="button"
                  to={`/courses/${this.state.courseDetail.id}`}
                >
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
              <h3 className="course--title">{this.state.courseDetail.title}</h3>
              <p>By {this.state.author}</p>
            </div>
            <div className="course--description">
              <p>{this.state.courseDetail.description}</p>
            </div>
          </div>

          <div className="grid-25 grid-right">
            <div className="course--stats">
              <ul className="course--stats--list">
                <li className="course--stats--list--item">
                  <h4>Estimated Time</h4>
                  <h3>{this.state.courseDetail.estimatedTime}</h3>
                </li>
                <li className="course--stats--list--item">
                  <h4>Materials Needed</h4>
                  <ul>{this.state.courseDetail.materialsNeeded}</ul>
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
