import axios from 'axios'
import Wrapper from '../../assets/wrappers/DashboardFormPage'
import { useDashboardContext } from '../Dashboard/DashboardLayout'
import { useNavigation, Form } from 'react-router-dom'
import { toast } from 'react-toastify'

export const action = async ({ request }) => {
  const formData = await request.formData()
  console.log(formData.get('Email'))
  const file = formData.get('avatar')
  if (file && file.size > 500000) {
    toast.error('Image size too large')
    return null
  }

  try {
    await axios.patch('/api/users/update-user', formData)
    toast.success('Profile updated successfully')
  } catch (error) {
    toast.error(error?.response?.data?.message)
  }
  return null
}
const Profile = () => {
  const { user } = useDashboardContext()
  const navigation = useNavigation()
  const isSubmitting = navigation.state === 'submitting'
  return (
    <Wrapper>
      <Form method='post' className='form' encType='multipart/form-data'>
        <h4 className='form-title'>profile</h4>
        {/* <div className='form-center'> */}
        <div className='form-row'>
          <label htmlFor='avatar' className='form-label'>
            Select an image file (max 0.5 MB):
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
            defaultValue={user.fname}
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
            defaultValue={user.lname}
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
            defaultValue={user.email}
            required
          />
        </div>
        <button
          className='btn btn-block form-btn'
          type='submit'
          disabled={isSubmitting}
        >
          {isSubmitting ? 'submitting...' : 'save changes'}
        </button>
      </Form>
    </Wrapper>
  )
}

export default Profile
