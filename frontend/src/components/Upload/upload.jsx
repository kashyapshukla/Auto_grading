import React, { useState } from 'react'
import axios from 'axios';
import Wrapper from '../../assets/wrappers/RegisterAndLoginPage'
import { Link } from 'react-router-dom'

function Upload() {
  const [state, setState] = useState({
    Question: '',
    Answer: '',
    userId: '0',
  })
  // const nv = useNavigate();

  const handleSubmit  = async () => {
  try{

    const response = await axios.post('http://localhost:5005/savenewupload', {
        student_Id: '65ed25f82f5496d9eadb746e',
        Question: state.Question,
        Answer: state.Answer
      });
      
      console.log(response.status);
      alert('Assingment has been updated' );
  
      
    } catch (error) {
      console.error('Error uplaoding:', error);
    }
    
      
  }

  return (
    <Wrapper>
      <nav>
        <h4>Assignment Grade</h4>
      </nav>
      <form onSubmit={handleSubmit} className='form'>
        <h5>Submit your Assignment</h5>
        <div className='form-row'>
          <label htmlFor='text' className='form-label'>
            Assignment
          </label>
          <textarea
            id='Question'
            name='Question'
            className='form-input'
            defaultValue=''
            required
            onChange={(e) => setState({ ...state, Question: e.target.value })}
          />
        </div>
        <div className='form-row'>
          <label htmlFor='text' className='form-label'>
            Submission
          </label>
          <textarea
            id='Answer'
            name='Answer'
            className='form-input'
            defaultValue=''
            required
            onChange={(e) => setState({ ...state, Answer: e.target.value })}
          />
        </div>
        <div className='form-row'>
          <button type='submit' className='btn'>
            Submit
          </button>
        </div>
        <div className='form-row'>
          <label htmlFor='text' className='form-label'>
            FeedBack
          </label>
          <textarea
            id='Feedback'
            name='Feedback'
            className='form-input'
            defaultValue=''
            required
            onChange={(e) => setState({ ...state, Feedback: e.target.value })}
          />
        </div>
      </form>
      {/* <form className='form' style={{ Width: 500 }}>
        <h4>Here is feed back</h4>
        <label htmlFor='text' className='form-label'>
          FeedBack
        </label>
        <input
          type='text'
          id='Question'
          name='Email'
          className='form-input'
          defaultValue=''
          required
          onChange={(e) => setState({ ...state, Question: e.target.value })}
        />
      </form> */}
    </Wrapper>
  )
}

export default Upload
