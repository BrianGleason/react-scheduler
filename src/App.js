import React from 'react';
import './App.css';

const schedule = {
  "title": "CS Courses for 2018-2019",
  "courses": {
    "CS394" : {
      "id" : "FCS394",
      "meets" : "MWF 3:30-4:50",
      "title" : "Agile Software Development"
    },
    "CS321" : {
      "id" : "FCS321",
      "meets" : "TTH 9:30-10:50",
      "title" : "Programming Languages"
    },
    "CLASSICS211" : {
      "id" : "FCLASSICS211",
      "meets" : "MWF 1:30-12:50, F 12-12:50",
      "title" : "Greek and Roman History"
    },
    "CS340" : {
      "id" : "FCS340",
      "meets" : "TuTh 3:30-4:50",
      "title" : "Introduction to Networking"  
    }
  }
};

const terms = { F: 'Fall', W: 'Winter', S: 'Spring'};

const getCourseTerm = course => (
  terms[course.id.charAt(0)]
);

const getCourseNumber = course => (
  course.id.slice(1, 6)
);

const getCourseTime = course => (
  course.meets
);

const Course = ({ course }) => (
  <div className="card m-1 p-2">
    <div className="card-body">
      <div className="card-title">{ getCourseTerm(course) } { getCourseNumber(course) }</div>
      <div className="card-text">{ course.title }</div>
      <div className="card-time">{ getCourseTime(course) }</div>

    </div>
  </div>
);

const CourseList = ({ courses }) => (
  <div className="course-list">
    { Object.values(courses).map(course => <Course key={course.id} course={ course } />) }
  </div>
);

const Banner = ({ title }) => (
  <h1>{ title }</h1>
);

const App = () =>  (
  <div className="container">
    <Banner title={ schedule.title } />
    <CourseList courses={ schedule.courses } />
  </div>
);

export default App;