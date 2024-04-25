import Wrapper from '../../assets/wrappers/DashboardFormPage.js'
import { useLoaderData } from 'react-router-dom'
import { ASSIGNMENT_STATUS } from '../../utils/constant.js'
import { Form, useNavigation, redirect } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'

export const loader = async ({ params }) => {
  try {
    const { data } = await axios.get(`/api/assignments/${params.id}`)
    return data
  } catch (error) {
    toast.error(error.response.data.message)
    return redirect('/dashboard/all-assignments')
  }
}

export const action = async ({ request, params }) => {
  const formData = await request.formData()
  const data = Object.fromEntries(formData)
  try {
    await axios.patch(`/api/assignments/${params.id}`, data)
    toast.success('Assignment edited successfully')
  } catch (error) {
    toast.error(error.response.data.message)
    return error
  }
  return redirect('/dashboard/all-assignments')
}

const EditAssignment = () => {
  const { assignment } = useLoaderData()
  // console.log(job)
  const navigation = useNavigation()
  const isSubmitting = navigation.state === 'submitting'
  return (
    <Wrapper>
      <Form method='post' className='form'>
        <h4 className='form-title'>edit assignment</h4>
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
              defaultValue={assignment.title}
              required
            />
          </div>
          <div className='form-row'>
            <label htmlFor='requirement' className='form-label'>
              requirement
            </label>
            <input
              type='text'
              id='requirement'
              name='requirement'
              className='form-input'
              defaultValue={assignment.requirement}
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
              defaultValue={assignment.points}
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
              defaultValue={assignment.dueDate}
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
              defaultValue={assignment.assignmentStatus}
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
            className='btn btn-block form-btn '
            disabled={isSubmitting}
          >
            {isSubmitting ? 'submitting...' : 'submit'}
          </button>
        </div>
      </Form>
    </Wrapper>
  )
}

export default EditAssignment
