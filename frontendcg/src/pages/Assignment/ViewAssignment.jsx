import { Form, useLoaderData, useNavigation, redirect } from 'react-router-dom'
import { toast } from 'react-toastify'
import Wrapper from '../../assets/wrappers/Assignmentt.js'
import SubmissionWrapper from '../../assets/wrappers/AssignmentSubmission.js'
import axios from 'axios'
import day from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat.js'
import { useState } from 'react'
day.extend(advancedFormat)

let response
let assignmentId
export const loader = async ({ params }) => {
  try {
    const { data } = await axios.get(`/api/assignments/${params.id}`)
    console.log(data)
    return data
  } catch (error) {
    toast.error(error.response.data.message)
    return error
  }
}
export const action = async ({ request }) => {
  const formData = await request.formData()
  formData.append('assignmentId', assignmentId)
  formData.append('submissionStatus', 'submitted')
  const data = Object.fromEntries(formData)
  try {
    response = await axios.post('/api/assignments/submission', data)
    console.log(response)
    toast.success('Assignment graded Successfully')
  } catch (error) {
    toast.error(error?.response?.data?.message)
    return error
  }
  return redirect(`/dashboard/submission-details/${response?.data?.data?._id}`)
}

const ViewAssignment = () => {
  const { assignment } = useLoaderData()
  assignmentId = assignment._id
  const due = day(assignment.dueDate).format('MMM Do, YYYY')
  const [showForm, setShowForm] = useState(false)
  const navigation = useNavigation()
  const isSubmitting = navigation.state === 'submitting'
  return (
    <Wrapper>
      <header>
        <div className='main-icon'>{assignment.title.charAt(0)}</div>
        <div className='info'>
          <h5>{assignment.title}</h5>
          <div className={`status ${assignment.assignmentStatus}`}>
            {assignment.assignmentStatus}
          </div>
        </div>
      </header>
      <div className='form-center'>
        <div className='content'>
          <div>{assignment.requirement}</div>
          <div className='content-center'>{`Points: ${assignment.points}`}</div>
          <div>{`Due:  ${due}`}</div>
          {!showForm && (
            <footer className='actions'>
              <button
                type='button'
                className='btn delete-btn'
                onClick={() => setShowForm(true)}
              >
                Upload
              </button>
            </footer>
          )}
        </div>
      </div>
      <div className='form-center'>
        {showForm && (
          <SubmissionWrapper>
            <Form method='post' className='form'>
              <div className='form-row'>
                <label htmlFor='text' className='form-label'>
                  Upload your Submission here
                </label>
                <textarea
                  id='submission'
                  name='submission'
                  className='form-input'
                  defaultValue=''
                  required
                />
              </div>
              <footer className='actions'>
                <button
                  type='submit'
                  className='btn edit-btn'
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'submitting...' : 'submit'}
                </button>
                <button
                  type='cancel'
                  className='btn delete-btn'
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </button>
              </footer>
            </Form>
          </SubmissionWrapper>
        )}
      </div>
    </Wrapper>
  )
}

export default ViewAssignment
