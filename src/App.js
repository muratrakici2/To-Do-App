import React, { } from 'react'
import HomePage from './components/HomePage';
import Login from './components/Login'

function App() {
  const user = localStorage.getItem("user");
  const result = JSON.parse(user);
  return (
    <>
      {result ? <HomePage/>:<Login />} 
    </>
  );
}

export default App;
