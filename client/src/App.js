import React from "react";
import "./App.css";

// import components
import Header from "./components/Header";
import Courses from "./components/Courses";
import CourseDetail from "./components/CourseDetail";
import UserSignIn from "./components/UserSignIn";
import UserSignUp from "./components/UserSignUp";
import CreateCourse from "./components/CreateCourse";
import UpdateCourse from "./components/UpdateCourse";

function App() {
  return (
    <div className="App">
      <Header />
      {/* <Courses /> */}
      {/* <CourseDetail /> */}
      {/* <UserSignIn /> */}
      {/* <UserSignUp /> */}
      {/* <CreateCourse /> */}
      <UpdateCourse />
    </div>
  );
}

export default App;
