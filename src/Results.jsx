import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { classData } from './MockUpData/Mockupres';
import { useParams } from 'react-router-dom';

const Results = () => {
    let { className } = useParams();
    console.log(className)
    
  const [results, setResults] = useState([]);
  console.log(
    classData
  )
  
console.log(results)
  useEffect(() => {
    axios.get(`http://localhost:8080/class/${className}/results`)

      .then(response => {
        setResults(response.data.results);
      })
      .catch(error => {
        console.error('Error fetching results:', error);
      });
  }, [className]);

  return (
    <div>
      <h2>{className} Class results</h2>
      <ul>
        {results.map((result, index) => (
          <li key={index}>
            <p>Student Name : {result.studentName}</p>
            <p>Results : {result.result}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Results;
