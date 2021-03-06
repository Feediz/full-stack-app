import React, { Component } from "react";
import Form from "./Form";

class CreateCourse extends Component {
  state = {
    title: "",
    description: "",
    estimatedTime: "",
    materialsNeeded: "",
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
    this.setState({
      author,
    });
  }
  render() {
    const {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      errors,
      author,
    } = this.state;

    let _estimatedTime = estimatedTime ? estimatedTime : "";
    let _materialsNeeded = materialsNeeded ? materialsNeeded : "";

    return (
      <div className="bounds">
        <div className="bounds course--detail">
          <h1>Create Course</h1>
          <Form
            cancel={this.cancel}
            errors={errors}
            submit={this.submit}
            submitButtonText="Create Course"
            elements={() => (
              <React.Fragment>
                <div class="grid-66">
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
                    <p>By {author}</p>
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
                </div>

                <div class="grid-25 grid-right">
                  <div class="course--stats">
                    <ul class="course--stats--list">
                      <li class="course--stats--list--item">
                        <h4>Estimated Time</h4>
                        <div>
                          <input
                            id="estimatedTime"
                            name="estimatedTime"
                            type="text"
                            className="course--time--input"
                            placeholder="Hours"
                            onChange={this.change}
                            value={_estimatedTime}
                          />
                        </div>
                      </li>
                      <li class="course--stats--list--item">
                        <h4>Materials Needed</h4>
                        <div>
                          <textarea
                            id="materialsNeeded"
                            name="materialsNeeded"
                            className=""
                            placeholder="List materials..."
                            onChange={this.change}
                            value={_materialsNeeded}
                          />
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </React.Fragment>
            )}
          />
        </div>
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

    // create course
    context.apiData
      .createCourse(courseDetail, userDetail)
      .then((errors) => {
        if (errors) {
          console.log(`There is an error: ${errors}`);
          this.setState({ errors });
        } else {
          console.log(`Course added`);
          this.props.history.push("/courses");
        }
      })
      .catch((err) => {
        console.error(err);
        this.props.history.push("/error");
      });
  };

  // handle cancel request
  cancel = () => {
    this.props.history.push("/");
  };
}

export default CreateCourse;
