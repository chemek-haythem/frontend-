import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from "./Register";
import Home from './Home';
import Login from './Login';
import Results from './Results';
import Timetable from './Timetable';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/class/:className/timetable' element={<Timetable />} />
          <Route path='/class/:className/results' element={<Results />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
