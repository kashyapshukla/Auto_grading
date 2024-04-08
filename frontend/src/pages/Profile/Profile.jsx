import Wrapper from '../../assets/wrappers/DashboardFormPage'
import { useNavigation, Form, useParams } from 'react-router-dom'
import React, { useState } from 'react'

const Profile = () => {


  const [state, setState] = useState({
    fname: '',
    lname: '',
    email: '',
    password: '',
    isLoggedIn: false,
  })
    const student=useParams();
    const student_Id=student.user_Id;
    console.log(student_Id);

  const submitForm = async (event) => {
    event.preventDefault();
    const { fname, lname, email, password } = state

    const formData = new FormData();
    const imageInput = document.getElementById('avatar');
    
    formData.append('Image', imageInput.files[0]);
  
    try {
      const response1 = await fetch("http://localhost:5005/image", {
        method: 'POST',
        body: formData
      });
  
      if (response1.ok) {
        console.log('Image uploaded successfully');
        // Handle success
      } else {
        console.error('Failed to upload image');
        // Handle error
      }

      const updateData = {
        student_id:""+student_Id, // Replace with actual student ID
        fname: fname,
        lname: lname,
        email: email,
        password: password
      };
      console.log(updateData)
  
      const response2 = await fetch("http://localhost:5005/update-profile", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updateData)
      });
  
     
  
      
       

      
    } catch (error) {
      console.error('Server error:', error);
      // Handle error
    }
  };

  return (
    <Wrapper>
     
     <Form method='post' className='form' encType='multipart/form-data'>
        <h4 className='form-title'>profile</h4>
        {/* <div className='form-center'> */}
        <div className='form-row'>
          <label htmlFor='avatar' className='form-label'>
            Select an image
          </label>
          <input
            type='file'
            id='avatar'
            name='image'
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
            defaultValue=''
            required
            onChange={(e) => setState({ ...state, fname: e.target.value })}

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
            defaultValue=''
            required
            onChange={(e) => setState({ ...state, lname: e.target.value })}

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
            defaultValue=''
            required
            onChange={(e) => setState({ ...state, email: e.target.value })}

          />
        </div>
        <div className='form-row'>
          <label htmlFor='Password' className='form-label'>
            Password
          </label>
          <input
            type='password'
            id='Password'
            name='Password'
            className='form-input'
            defaultValue=''
            required
            autoComplete='current-password'
            onChange={(e) => setState({ ...state, password: e.target.value })}

          />
        </div>
        
        
        
       
        <button className='btn btn-block form-btn' type='submit' onClick={submitForm}>
          Submit
        </button>
    </Form>
    </Wrapper>
  )
}

export default Profile
