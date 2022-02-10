// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getDatabase, onValue, ref, set } from 'firebase/database';
import { useState, useEffect } from 'react';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCVg3caZnZ2ZJqeVG0YHo618qWBdXQ_RYI",
    authDomain: "react-demo-4bf6c.firebaseapp.com",
    databaseURL: "https://react-demo-4bf6c-default-rtdb.firebaseio.com",
    projectId: "react-demo-4bf6c",
    storageBucket: "react-demo-4bf6c.appspot.com",
    messagingSenderId: "49109366096",
    appId: "1:49109366096:web:701227a6f72f3aafdde855",
    measurementId: "G-T8JMBSH764"
  };

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const database = getDatabase(firebase);


export const useData = (path, transform) => {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
  
    useEffect(() => {
      const dbRef = ref(database, path);
      const devMode = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
      if (devMode) { console.log(`loading ${path}`); }
      return onValue(dbRef, (snapshot) => {
        const val = snapshot.val();
        if (devMode) { console.log(val); }
        setData(transform ? transform(val) : val);
        setLoading(false);
        setError(null);
      }, (error) => {
        setData(null);
        setLoading(false);
        setError(error);
      });
    }, [path, transform]);
  
    return [data, loading, error];
  };


  export const setData = (path, value) => (
    set(ref(database, path), value)
  );