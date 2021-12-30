import React from 'react';

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
      "meets" : "MW 1:30-12:50, F 12:00-12:50",
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
  course.id.slice(1, 5)
);

const Course = ({ course }) => (
  <div>
    { getCourseTerm(course) } { getCourseNumber(course) }: { course.title }
  </div>
);

const CourseList = ({ courses }) => (
  <div>
    { Object.values(courses).map(course => <Course key={course.id} course={ course } />) }
  </div>
);

const Banner = ({ title }) => (
  <h1>{ title }</h1>
);

const App = () =>  (
  <div>
    <Banner title={ schedule.title } />
    <CourseList courses={ schedule.courses } />
  </div>
);

export default App;