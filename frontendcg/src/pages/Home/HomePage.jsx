import Wrapper from '../../assets/wrappers/HomePage'
import homeImage from '../../assets/Images/homeImage.svg'
import { Link } from 'react-router-dom'
import Logo from '../../components/Logo'
const LoginPage = () => {
  return (
    <Wrapper>
      <nav>
        <nav>
          <Logo />
        </nav>
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
          <Link to='/sign-up' className='btn register-link'>
            Sign-Up
          </Link>
          <Link to='/log-in' className='btn register-link'>
            Login
          </Link>
        </div>
        <img src={homeImage} alt='code grading' className='img main-img' />
      </div>
    </Wrapper>
  )
}

export default LoginPage
