// 
import React, { useState } from 'react';
import axios from 'axios';
import TaskList from './TaskList';
import {useEffect} from 'react';

const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status

  const fetchAuthentication = async () => {
    try {
      const storedEmail = localStorage.getItem('email');
      console.log(storedEmail)
      const storedPassword = localStorage.getItem('password');
      if(!storedEmail){
        setIsLoggedIn(false)
      }
      //API call
      const response = await axios.post('http://localhost:10004/user/login', { storedEmail, storedPassword });
      console.log(response)
      if(response.data.status){
        setIsLoggedIn(true)
      }
      
      } catch (error) {
        console.log('my Login error: ', error)
      }
	
  }

  useEffect( () => {
    fetchAuthentication()

  }, []);



  const handleLogin = async () => {

    try {
    
      const response = await axios.post('http://localhost:10004/user/login', { email, password });
      localStorage.setItem('email', email);
      localStorage.setItem('password', password);
      setIsLoggedIn(true); // Set login status to true on successful login
      console.log(isLoggedIn);
      console.log(response.data); 
    } catch (error) {
      console.error('my Login error:', error);
    }
  };

  if (isLoggedIn) {
    console.log("rendering tasklist");
    return <TaskList />;
}
  return (
    <div>
      <h2>Login</h2>
      
      <input type="text" placeholder="Username" onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
      
    </div>
  );
};

export default Login;