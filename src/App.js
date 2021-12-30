import React, { useState, useEffect } from 'react';
import './App.css';
/*
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
*/

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
      <div className="card-title">{ getCourseTerm(course) } { getCourseNumber(course) } { getCourseTime(course) }</div>
      <div className="card-text">{ course.title }</div>
    </div>
  </div>
);

const TermButton = ({term, setTerm, checked}) => (
  <>
    <input type="radio" id={term} className="btn-check" checked={checked} autoComplete="off"
      onChange={() => setTerm(term)} />
    <label class="btn btn-success m-1 p-2" htmlFor={term}>
    { term }
    </label>
  </>
);

const TermSelector = ({term, setTerm}) => (
  <div className="btn-group">
  { 
    Object.values(terms).map(value => (
      <TermButton key={value} term={value} setTerm={setTerm} checked={value === term} />
    ))
  }
  </div>
);

const CourseList = ({ courses }) => {
  const [term, setTerm] = useState('Spring');
  const termCourses = Object.values(courses).filter(course => term === getCourseTerm(course));
  
  return (
    <>
      <TermSelector term={term} setTerm={setTerm} />
      <div className="course-list">
      { termCourses.map(course => <Course key={course.id} course={ course } />) }
      </div>
   </>
  );
};

const Banner = ({ title }) => (
  <h1>{ title }</h1>
);

const App = () => {
  const [schedule, setSchedule] = useState();
  const url = 'https://courses.cs.northwestern.edu/394/data/cs-courses.php';

  useEffect(() => {
    const fetchSchedule = async () => {
      const response = await fetch(url);
      if (!response.ok) throw response;
      const json = await response.json();
      setSchedule(json);
    }
    fetchSchedule();
  }, []);

  if (!schedule) return <h1>Loading schedule...</h1>;

  return (
    <div className="container">
      <Banner title={ schedule.title } />
      <CourseList courses={ schedule.courses } />
    </div>
  );
};

export default App;