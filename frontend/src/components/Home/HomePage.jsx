import React from 'react'
import Wrapper from '../../assets/wrappers/HomePage'
import homeImage from '../../assets/Images/homeImage.svg'
import { Link } from 'react-router-dom'

function LoginPage() {
  return (
    <Wrapper >
      <nav>
        <h2 className='logo'>Code Grader</h2>
      </nav>
      <div className='container page'>
        <div className='info'>
          <h1>
            Auto <span>code</span> grader
          </h1>
          <p>
            Auto-grade everything, including advanced coding tests, and give
            learners instant, meaningful feedback with powerful LLM assessments
            engine.
          </p>
          <Link to='/admin_login' className='btn register-link'>
            Professor
          </Link>
          <Link to='/sign-up' className='btn register-link'>
            Student Sign-Up
          </Link>
          <Link to='/log-in' className='btn register-link'>
            Student Login
          </Link>
        </div>
        <img src={homeImage} alt='code grading' className='img main-img' />
      </div>
    </Wrapper>
  )
}

export default LoginPage
