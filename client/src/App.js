import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "./App.css";

// import app components
import Header from "./components/Header";
import Courses from "./components/Courses";
import CourseDetail from "./components/CourseDetail";
import UserSignIn from "./components/UserSignIn";
import UserSignUp from "./components/UserSignUp";
import UserSignOut from "./components/UserSignOut";
import CreateCourse from "./components/CreateCourse";
import UpdateCourse from "./components/UpdateCourse";

import Forbidden from "./components/Forbidden";
import NotFound from "./components/NotFound";
import UnhandledError from "./components/UnhandledError";

import withContext from "./Context";
import PrivateRoute from "./PrivateRoute";

const HeaderWithContext = withContext(Header);
const CoursesWithContext = withContext(Courses);
const CourseDetailWithContext = withContext(CourseDetail);
const UserSignInWithContext = withContext(UserSignIn);
const UserSignUpWithContext = withContext(UserSignUp);
const UserSignOutWithContext = withContext(UserSignOut);
const CreateCourseWithContext = withContext(CreateCourse);
const UpdateCourseWithContext = withContext(UpdateCourse);

const ForbiddenWithContext = withContext(Forbidden);
const NotFoundWithContext = withContext(NotFound);
const UnhandledErrorWithContext = withContext(UnhandledError);

const App = () => (
  <BrowserRouter>
    <div className="container">
      <HeaderWithContext />
      {/* exact make it so url matches exactly */}
      <Switch>
        <Redirect exact from="/" to="/courses" />
        <Route exact path="/courses" component={CoursesWithContext} />
        <PrivateRoute
          path="/courses/create"
          component={CreateCourseWithContext}
        />
        <Route exact path="/courses/:id" component={CourseDetailWithContext} />
        <PrivateRoute
          path="/courses/:id/update"
          component={UpdateCourseWithContext}
        />

        <Route path="/signin" component={UserSignInWithContext} />
        <Route path="/signup" component={UserSignUpWithContext} />
        <Route path="/signout" component={UserSignOutWithContext} />

        <Route path="/forbidden" component={ForbiddenWithContext} />
        <Route path="/notfound" component={NotFoundWithContext} />
        <Route path="/error" component={UnhandledErrorWithContext} />

        <Redirect to="/notfound" />
      </Switch>
    </div>
  </BrowserRouter>
);

export default App;
