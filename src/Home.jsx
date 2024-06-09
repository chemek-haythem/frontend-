import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function Header({ isAuthenticated }) {
  const handleLogout = () => {
    axios.get('http://localhost:8080/logout')
      .then(() => {
        window.location.reload(true);
      }).catch(err => console.log(err));
  };

  return (
    <header className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
      <div className="container">
        <Link to="/" className="navbar-brand fw-bold">Classroom Notes</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          {isAuthenticated ? (
            <button className="btn btn-outline-danger" onClick={handleLogout}>Logout</button>
          ) : (
            <>
              <Link to="/login" className="btn btn-outline-primary me-2">Sign In</Link>
              <Link to="/register" className="btn btn-outline-success">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

const Footer = () => {
  return (
    <footer className="footer mt-auto py-3 bg-light text-dark shadow-sm">
      <div className="container text-center">
        <p>&copy; 2024 Classroom Notes. All rights reserved.</p>
      </div>
    </footer>
  );
};

const Home = () => {
  const [auth, setAuth] = useState(false);
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');

  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios.get('http://localhost:8080')
      .then(res => {
        console.log(res.data);
        if (res.data.Status === "Success") {
          setAuth(true);
          setName(res.data.name);
        } else {
          setAuth(false);
          setName('');
          setMessage(res.data.Error);
        }
      })
      .catch(err => console.error('Error during authentication:', err));
  }, []);

  const handleLogout = () => {
    axios.get('http://localhost:8080/logout')
      .then(() => {
        window.location.reload(true);
      }).catch(err => console.log(err));
  };

  const classLinks = [
    { name: 'DSI21', path: '/class/DSI21' },
    { name: 'DSI22', path: '/class/DSI22' },
    { name: 'TI11', path: '/class/TI11' },
    { name: 'TI12', path: '/class/TI12' },
    { name: 'TI13', path: '/class/TI13' },
    { name: 'TI14', path: '/class/TI14' },
  ];

  return (
    <div className="d-flex flex-column min-vh-100 bg-light">
      <Header isAuthenticated={auth} />
      <div className="container flex-grow-1 d-flex flex-column justify-content-center align-items-center">
        {auth ? (
          <div className="text-center"> 
            <h1 className="display-4 mb-4">Welcome back, {name}!</h1>
            <p className="lead">You are currently logged in Classroom Notes.</p>
            <div className="mt-4">
              <h2 className="mb-3">Your Classes</h2>
              <div className="row">
                {classLinks.map((cls) => (
                  <div key={cls.name} className="col-md-4 mb-4">
                    <h3>{cls.name}</h3>
                    <ul className="list-unstyled">
                      <li>
                        <Link to={`${cls.path}/timetable`} className="btn btn-outline-info me-2">Time Table</Link>
                      </li>
                      <li>
                        <Link to={`${cls.path}/results`} className="btn btn-outline-info me-2">Results</Link>
                      </li>
                    </ul>
                  </div>
                ))}
              </div>
              <button className="btn btn-outline-danger mt-3" onClick={handleLogout}>Logout</button>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <h1 className="display-4 mb-4">Welcome to Classroom Notes</h1>
            <p className="lead">{message || "Login to access your account"}</p>
            <div className="mt-4">
              <Link to="/login" className="btn btn-outline-primary me-2 btn-lg">Sign In</Link>
              <Link to="/register" className="btn btn-outline-success btn-lg">Sign Up</Link>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Home;
