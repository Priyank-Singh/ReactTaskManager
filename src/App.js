import React from 'react';
import Main from './components/Main'
import './App.css';
import { BrowserRouter as Router, Route,Routes,Link } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import TaskList from './components/TaskList';

function App() {
  return (
    <Router>
    <h2>Welcome to My App</h2>
      <ul>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
      </ul> 
      <Routes>
      <Route exact path='/login' element={< Login />}></Route>
      <Route exact path='/register' element={< Register />}></Route>
      </Routes>
    {/* <React.Fragment>
 
      
    {/* </React.Fragment> */}
  </Router>
  );
}

export default App;