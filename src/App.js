import React from 'react';
import './App.css';
import { addScheduleTimes } from './utilities/time.js';
import { CourseList } from './components/CourseList.js';
import { useData } from './utilities/firebase.js';

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

const Banner = ({ title }) => (
  <h1>{ title }</h1>
);

const App = () => {
  const [schedule, loading, error] = useData('/', addScheduleTimes); 
  
  if (error) return <h1>{error}</h1>;
  if (loading) return <h1>Loading the schedule...</h1>

  return (
    <div className="container">
      <Banner title={ schedule.title } />
      <CourseList courses={ schedule.courses } />
    </div>
  );
};

export default App;