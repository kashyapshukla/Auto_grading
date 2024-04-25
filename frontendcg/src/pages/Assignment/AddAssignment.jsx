import axios from 'axios'
import Wrapper from '../../assets/wrappers/DashboardFormPage.js'
import { useOutletContext } from 'react-router-dom'
import { Form, useNavigation, redirect } from 'react-router-dom'
import { toast } from 'react-toastify'
import { ASSIGNMENT_STATUS } from '../../utils/constant.js'

export const action = async ({ request }) => {
  // console.log(request.formData())
  const formData = await request.formData()
  const data = Object.fromEntries(formData)
  // console.log(data)
  try {
    await axios.post('/api/assignments', data)
    toast.success('Assignment Added Successfully')
    return redirect('/dashboard/all-assignments')
  } catch (error) {
    toast.error(error?.response?.data?.message)
    return error
  }
}
const AddAssignment = () => {
  const { user } = useOutletContext()
  const navigation = useNavigation()
  const isSubmitting = navigation.state === 'submitting'
  return (
    <Wrapper>
      <Form method='post' className='form'>
        <h4 className='form-title'>add assignment</h4>

        <div className='form-center'>
          <div className='form-row'>
            <label htmlFor='title' className='form-label'>
              title
            </label>
            <input
              type='text'
              id='title'
              name='title'
              className='form-input'
              defaultValue=''
              required
            />
          </div>
          <div className='form-row'>
            <label htmlFor='requirement' className='form-label'>
              requirement
            </label>
            <input
              type='textarea'
              id='requirement'
              name='requirement'
              className='form-input'
              defaultValue=''
              required
            />
          </div>
          <div className='form-row'>
            <label htmlFor='points' className='form-label'>
              points
            </label>
            <input
              type='text'
              id='points'
              name='points'
              className='form-input'
              defaultValue=''
              required
            />
          </div>
          <div className='form-row'>
            <label htmlFor='dueDate' className='form-label'>
              dueDate
            </label>
            <input
              type='date'
              id='dueDate'
              name='dueDate'
              className='form-input'
              defaultValue=''
              required
            />
          </div>
          <div className='form-row'>
            <label htmlFor='status' className='form-label'>
              assignment status
            </label>
            <select
              name='assignmentStatus'
              id='assignmentStatus'
              className='form-select'
              defaultValue={ASSIGNMENT_STATUS.NOT_PUBLISHED}
            >
              {Object.values(ASSIGNMENT_STATUS).map((itemValue) => {
                return (
                  <option key={itemValue} value={itemValue}>
                    {itemValue}
                  </option>
                )
              })}
            </select>
          </div>
          <button
            type='submit'
            className='btn btn-block form-btn'
            disabled={isSubmitting}
          >
            {isSubmitting ? 'submitting..' : 'submit'}
          </button>
        </div>
      </Form>
    </Wrapper>
  )
}

export default AddAssignment
