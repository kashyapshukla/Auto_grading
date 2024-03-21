import React, { useState } from 'react'
import Wrapper from '../../assets/wrappers/RegisterAndLoginPage'
import { Link } from 'react-router-dom'

function SignupStudent() {
  const [state, setState] = useState({
    fname: '',
    lname: '',
    email: '',
    password: '',
    isLoggedIn: false,
  })
  // const nv = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault()
    const { fname, lname, email, password } = state
    console.log("vvvv",fname,email, password)

    fetch('http://localhost:5005/register', {
      method: 'POST',
      crossDomain: true,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        fname,
        lname,
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.status)
        if ( data.status=== 'ok') {
          console.log("ok")
          // setState({ ...state, isLoggedIn: true, userId: data.data._id })
          // nv(`/users_edit_or_new/${data.data._id}`);
        }
      })
  }

  return (
    <Wrapper >
      <form onSubmit={handleSubmit} className='form'>
        <h4 className='login'>Sign up</h4>
        <div className='form-row'>
          <label htmlFor='FIrst Name' className='form-label'>
            First Name
          </label>
          <input
            type='text'
            id='FIrst Name'
            name='FIrst Name'
            className='form-input'
            defaultValue=''
            required
            onChange={(e) => setState({ ...state, fname: e.target.value })}
          />
        </div>
        <div className='form-row'>
          <label htmlFor='Last Name' className='form-label'>
            Last Name
          </label>
          <input
            type='text'
            id='Last Name'
            name='Last Name'
            className='form-input'
            defaultValue=''
            required
            onChange={(e) => setState({ ...state, lname: e.target.value })}
          />
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
            onChange={(e) => setState({ ...state, email: e.target.value })}
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
            onChange={(e) => setState({ ...state, password: e.target.value })}
          />
        </div>

        <button type='submit' className='btn'>
          Submit
        </button>

        <p>
          Already a member?
          <Link to='/log-in' className='member-btn'>
            Login
          </Link>
        </p>
      </form>
    </Wrapper>
  )
}

export default SignupStudent
