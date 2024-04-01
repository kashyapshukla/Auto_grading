import React, { useState } from 'react'
import { useParams } from "react-router-dom";

import axios from 'axios';
import Wrapper from '../../assets/wrappers/RegisterAndLoginPage'
import { Link, useNavigate } from 'react-router-dom'
import {  signOut } from "firebase/auth";
import {auth} from '../../firebase';
function Upload() {

  const navigate = useNavigate();
  const [state, setState] = useState({
    Question: '',
    Answer: '',
    userId: '0',
  })
  // const nv = useNavigate();
  const student_Id= useParams();
  console.log(student_Id.user_Id);
  const handleSubmit  = async () => {
  try{

    console.log(state.Question)

    const response = await axios.post('http://localhost:5005/savenewupload', {
        student_id:student_Id.user_Id,
        question: state.Question,
        answer: state.Answer
      });
      
      console.log(response.status);
      alert('Assingment has been updated' );
  
      
    } catch (error) {
      console.error('Error uplaoding:', error);
    }
    
      
  }

  const handleLogout = () => {               
    signOut(auth).then(() => {
    // Sign-out successful.
        navigate("/");
        console.log("Signed out successfully")
    }).catch((error) => {
    // An error happened.
    });
}

  return (
    <Wrapper>
      <nav style={{
        display:'grid',
        gridTemplateColumns: 'repeat(2, 1fr)'
      }}>
        <h4>Assignment Grade</h4>
      
        <button onClick={handleLogout}>
                        Logout
                    </button>
        
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
       
      </form>

      <form className='form'>
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
