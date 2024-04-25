import Wrapper from '../../assets/wrappers/RegisterAndLoginPage'
import { Link, redirect, useNavigation, Form } from 'react-router-dom'
import Logo from '../../components/Logo'
import axios from 'axios'
import { toast } from 'react-toastify'

export const action = async ({ request }) => {
  const formData = await request.formData()
  const data = Object.fromEntries(formData)
  // console.log(data)
  try {
    await axios.post('/api/register', data)
    toast.success('Registration Successful')
    // return null
    return redirect('/log-in')
  } catch (error) {
    console.log(error)
    toast.error(error?.response?.data?.msg)
    return error
  }
}

const SignupStudent = () => {
  const navigation = useNavigation()
  // console.log(navigation)
  const isSubmitting = navigation.state === 'submitting'
  return (
    <Wrapper>
      <Form method='post' className='form'>
        <Logo />
        <h4 className='login'>Sign up</h4>
        <div className='form-row'>
          <label htmlFor='firstName' className='form-label'>
            First Name
          </label>
          <input
            type='text'
            id='fname'
            name='fname'
            className='form-input'
            defaultValue=''
            required
          />
        </div>
        <div className='form-row'>
          <label htmlFor='lastName' className='form-label'>
            Last Name
          </label>
          <input
            type='text'
            id='lname'
            name='lname'
            className='form-input'
            defaultValue=''
            required
          />
        </div>
        <div className='form-row'>
          <label htmlFor='email' className='form-label'>
            Email
          </label>
          <input
            type='email'
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
            required
          />
        </div>

        <button type='submit' className='btn btn-block' disabled={isSubmitting}>
          {isSubmitting ? 'submitting...' : 'submit'}
        </button>

        <p>
          Already a member?
          <Link to='/log-in' className='member-btn'>
            Login
          </Link>
        </p>
      </Form>
    </Wrapper>
  )
}

export default SignupStudent
