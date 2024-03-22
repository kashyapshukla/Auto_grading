import React, { useState } from 'react'

import Wrapper from '../../assets/wrappers/Assignment'
import { Link } from 'react-router-dom'

function Upload() {
  const [state, setState] = useState({
    Question: '',
    Answer: '',
    userId: '0',
  })
  // const nv = useNavigate();

  const handleSubmit = (e) => {}

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
            name='Email'
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
            id='Question'
            name='Email'
            className='form-input'
            defaultValue=''
            required
            onChange={(e) => setState({ ...state, Question: e.target.value })}
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
