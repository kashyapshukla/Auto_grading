import Wrapper from '../../assets/wrappers/DashboardFormPage'
import { useNavigation, Form } from 'react-router-dom'

const Profile = () => {
  return (
    <Wrapper>
      <Form method='post' className='form' encType='multipart/form-data'>
        <h4 className='form-title'>profile</h4>
        {/* <div className='form-center'> */}
        <div className='form-row'>
          <label htmlFor='avatar' className='form-label'>
            Select an image
          </label>
          <input
            type='file'
            id='avatar'
            name='avatar'
            className='form-input'
            accept='image/*'
          />
        </div>
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
          />
        </div>
        <button className='btn btn-block form-btn' type='submit'>
          Submit
        </button>
      </Form>
    </Wrapper>
  )
}

export default Profile
