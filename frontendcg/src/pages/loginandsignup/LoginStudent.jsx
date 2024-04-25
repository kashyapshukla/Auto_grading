import Wrapper from '../../assets/wrappers/RegisterAndLoginPage'
import { Form, Link, redirect, useNavigation } from 'react-router-dom'
import Logo from '../../components/Logo'
import axios from 'axios'
import { toast } from 'react-toastify'

export const action = async ({ request }) => {
  // console.log(request)
  const formData = await request.formData()
  const data = Object.fromEntries(formData)
  try {
    await axios.post('/api/login-user', data)
    toast.success('Login successful')
    return redirect('/dashboard')
  } catch (error) {
    toast.error(error?.response?.data?.msg)
    return error
  }
}
const LoginStudent = () => {
  const navigation = useNavigation()
  const isSubmitting = navigation.state === 'submitting'
  return (
    <Wrapper>
      <Form method='post' className='form'>
        <Logo />
        <h4>Login</h4>
        <div className='form-row'>
          <label htmlFor='Email' className='form-label'>
            Email
          </label>
          <input
            type='text'
            id='email'
            name='email'
            className='form-input'
            defaultValue=''
            required
          />
        </div>
        <div className='form-row'>
          <label htmlFor='Password' className='form-label'>
            Password
          </label>
          <input
            type='password'
            id='password'
            name='password'
            className='form-input'
            defaultValue=''
            autoComplete='current-password'
            required
          />
        </div>
        <button type='submit' className='btn btn-block' disabled={isSubmitting}>
          {isSubmitting ? 'submitting...' : 'submit'}
        </button>
        <p>
          Not a member yet?
          <Link to='/sign-up' className='member-btn'>
            Sign Up
          </Link>
        </p>
      </Form>
    </Wrapper>
  )
}

export default LoginStudent
