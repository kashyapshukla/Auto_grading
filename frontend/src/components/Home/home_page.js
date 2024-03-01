import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';


function LoginPage() {


    const nv = useNavigate();
    const handleStudentLogin = () => nv("/log-in");
    const handleStudentSignup= () => nv("/sign-up");
    const handleProf= () => nv("/admin_login");


  

  

  return (
    <>
    <div>
        <h1>
            This is going to be the home page.
        </h1>

        <div onClick={handleProf} > 
        <span>
          Professor
        </span></div>
        <div onClick={handleStudentSignup} >
        <span>
          Student Sign-Up
        </span>
        </div>
        <div onClick={handleStudentLogin} >
        <span >
         Student Login
        </span>

        </div>

        



    </div>
  </>

  );
}

export default LoginPage;
