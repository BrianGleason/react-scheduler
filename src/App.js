import React, { useState, useEffect } from 'react';
import './App.css';
import { hasConflict, getCourseTerm, terms, addScheduleTimes } from './utilities/time.js';
import { CourseList } from './components/CourseList.js';

const schedule_2 = {
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


const getCourseNumber = course => (
  course.id.slice(1, 6)
);

export const Course = ({ course, selected, setSelected }) => {
  const isSelected = selected.includes(course);
  const isDisabled = !isSelected && hasConflict(course, selected);
  const style = {
    backgroundColor: isDisabled? 'lightgrey' : isSelected ? 'lightgreen' : 'white'
  };
  return (
    <div className="card m-1 p-2" 
      style={style}
      onClick={isDisabled ? null : () =>  setSelected(toggle(course, selected))}>
      <div className="card-body">
        <div className="card-title">{ getCourseTerm(course) } CS { getCourseNumber(course) }</div>
        <div className="card-text">{ course.title }</div>
      </div>
    </div>
  );
};


const toggle = (x, lst) => (
  lst.includes(x) ? lst.filter(y => y !== x) : [x, ...lst]
);

const Banner = ({ title }) => (
  <h1>{ title }</h1>
);

const App = () => {
  const [schedule, setSchedule] = useState(schedule_2);
  const url = 'https://courses.cs.northwestern.edu/394/data/cs-courses.php';

  useEffect(() => {
    const fetchSchedule = async () => {
      const response = await fetch(url);
      if (!response.ok) {
        throw response;
      }
      console.log(response);
      const json = await response.json();
      setSchedule(addScheduleTimes(json));
    }
    fetchSchedule();
  }, [])

  return (
    <div className="container">
      <Banner title={ schedule.title } />
      <CourseList courses={ schedule.courses } />
    </div>
  );
};

export default App;