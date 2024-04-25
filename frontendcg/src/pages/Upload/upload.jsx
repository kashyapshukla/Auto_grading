import { Form, useNavigation } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import SubmissionWrapper from '../../assets/wrappers/AssignmentSubmission'
let data1

export const action = async ({ request }) => {
  const formData = await request.formData()
  const data = Object.fromEntries(formData)
  try {
    data1 = await axios.post('/api/assignments/submission', data)
    console.log(data1)
    toast.success('Assignment graded Successfully')
    return null
  } catch (error) {
    toast.error(error?.response?.data?.message)
    return error
  }
}
const Upload = () => {
  // let res = ''
  // const [state, setState] = useState({
  //   Question: '',
  //   Answer: '',
  //   student_Id: '',
  // })
  // // const nv = useNavigate();
  // const student_Id = useParams()
  // console.log(student_Id.user_Id)
  // const handleSubmit = async () => {
  //   try {
  //     console.log(state.Question)
  //     const response = await axios.post('http://localhost:5005/savenewupload', {
  //       student_id: student_Id.user_Id,
  //       question: state.Question,
  //       answer: state.Answer,
  //     })
  //     res = response
  //     console.log(response.status)
  //     console.log(res)
  //     alert('Assignment has been updated')
  //   } catch (error) {
  //     console.error('Error uplaoding:', error)
  //   }
  // }
  const navigation = useNavigation()
  const isSubmitting = navigation.state === 'submitting'
  return (
    <SubmissionWrapper>
      <Form method='post' className='form'>
        <h5>Assignment Grade</h5>
        <div className='form-row'>
          <label htmlFor='text' className='form-label'>
            Assignment
          </label>
          <textarea
            id='question'
            name='question'
            className='form-input'
            defaultValue=''
            required
          />
        </div>
        <div className='form-row'>
          <label htmlFor='text' className='form-label'>
            Submission
          </label>
          <textarea
            id='answer'
            name='answer'
            className='form-input'
            defaultValue=''
            required
          />
        </div>
        <button
          type='submit'
          className='btn btn-block form-btn '
          disabled={isSubmitting}
        >
          {isSubmitting ? 'submitting...' : 'submit'}
        </button>
      </Form>
      <div className='form-row'>
        <label htmlFor='text' className='form-label'>
          FeedBack
        </label>
        {data1 ? (
          <textarea
            id='Feedback'
            name='Feedback'
            className='form-input'
            defaultValue={data1?.data?.data?.feedback}
            required
          />
        ) : (
          <textarea
            id='Feedback'
            name='Feedback'
            className='form-input'
            defaultValue=''
            required
          />
        )}
      </div>
    </SubmissionWrapper>
  )
}

export default Upload
