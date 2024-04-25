import { useLoaderData } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'
import Wrapper from '../../assets/wrappers/Assignmentt.js'

export const loader = async ({ params }) => {
  try {
    const { data } = await axios.get(`/api/submission/details/${params.id}`)
    return data
  } catch (error) {
    toast.error(error.response.data.message)
    return error
  }
}
const SubmissionDetails = () => {
  const { response } = useLoaderData()
  const submission = response.submissionDetails
  // console.log(submission)
  const obj = JSON.parse(submission.feedback)
  console.log(obj.grade)
  return (
    <Wrapper>
      <header>
        <div className='main-icon'>
          {response.assignmentDetails.title.charAt(0)}
        </div>
        <div className='info'>
          <h5>{response.assignmentDetails.title}</h5>
          <div
            className={`status ${response.submissionDetails.submissionStatus}`}
          >
            {response.submissionDetails.submissionStatus}
          </div>
          <div>{`Points: ${response.assignmentDetails.points}`}</div>
        </div>
      </header>
      <div className='form-center'>
        <div className='content'>
          <div className='info'>
            <h5>Your Submission:</h5>
            <div>{response.submissionDetails.submission}</div>
          </div>
          <div className='info'>
            <h5> Grades:</h5>
            <div>{obj.grade || obj.score}</div>
            <div>
              <h5>Feedback: </h5>
              <div>{obj.feedback}</div>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  )
}

export default SubmissionDetails
