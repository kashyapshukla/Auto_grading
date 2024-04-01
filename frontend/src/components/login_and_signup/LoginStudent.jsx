import React, { useState } from 'react'

import Wrapper from '../../assets/wrappers/RegisterAndLoginPage'
import { Link, useNavigate } from 'react-router-dom'
import Logo from '../Logo/Logo'
import { auth } from '../../firebase';
import {  signInWithEmailAndPassword   } from 'firebase/auth';
import { signInWithGooglePopup } from "../../firebase.utils"


function LoginStudent() {



  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user.uid);
        navigate(`/upload/${user.uid}`)
        
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage)
    });
   
}

const logGoogleUser = async () => {
  const response = await signInWithGooglePopup();
  console.log(response.user.
    emailVerified);
    if(response.user.
      emailVerified){

        navigate(`/upload/${response.user.uid}`)

      }
}
  // const [state, setState] = useState({
  //   email: '',
  //   password: '',
  //   isLoggedIn: false,
  //   userId: '0',
  // })
  // const nv = useNavigate()

  // const handleSubmit = (e) => {
  //   e.preventDefault()
  //   const { email, password } = state
  //   console.log(email, password)

  //   fetch('http://localhost:5005/login-user', {
  //     method: 'POST',
  //     crossDomain: true,
  //     headers: {
  //       'Content-Type': 'application/json',
  //       Accept: 'application/json',
  //       'Access-Control-Allow-Origin': '*',
  //     },
  //     body: JSON.stringify({
  //       email,
  //       password,
  //     }),
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       if (data.status === 'ok') {
  //         console.log('ok', data.data._id )
  //         setState({ ...state, isLoggedIn: true, userId: data.data._id })
  //         nv(`/upload/${data.data._id}`)
  //       }
  //     })
  // }

  return (
    <Wrapper>
      <form onSubmit={handleSubmit} className='form'>
        <Logo />
        <h4>Login</h4>

        <div>
            <button onClick={logGoogleUser}>Sign In With Google</button>
        </div>
        <div className='form-row'>
          <label htmlFor='Email' className='form-label'>
            Email
          </label>
          <input
            type='text'
            id='Email'
            name='Email'
            className='form-input'
            defaultValue=''
            required
            onChange={(e) => setEmail( e.target.value)}
          />
        </div>
        <div className='form-row'>
          <label htmlFor='Password' className='form-label'>
            Password
          </label>
          <input
            type='password'
            id='Password'
            name='Password'
            className='form-input'
            defaultValue=''
            required
            autoComplete='current-password'
            onChange={(e) => setPassword(e.target.value )}
          />
        </div>
        <button type='submit' className='btn'>
          Submit
        </button>
        <p>
          Not a member yet?
          <Link to='/sign-up' className='member-btn'>
            Sign Up
          </Link>
        </p>
      </form>
    </Wrapper>
  )
}

export default LoginStudent
