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
      <h4>Upload your Assignment</h4>
    
     
      <form onSubmit={handleSubmit} className='form' >
        <h4>Enter your Assignment</h4>
        <label htmlFor='text' className='form-label'>
            Question
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
           <label htmlFor='text' className='form-label'>
            Answer
          </label>
          <input
            
            type='text'
            id='Answer'
            name='Answer'
            className='form-input'
            defaultValue=''
            required
            onChange={(e) => setState({ ...state, Answer: e.target.value })}
          />
           <button type='submit' className='btn'>
          Submit
        </button> 
        
      </form>
      <form className='form'  style={{Width: 500}}>
        <h4>Here is feed back</h4>
        <label htmlFor='text' className='form-label' >
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
          
        
      </form>
    </Wrapper>
  )
}

export default Upload