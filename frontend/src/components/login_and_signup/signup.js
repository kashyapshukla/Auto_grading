// import React, { useState } from 'react'

// import { useNavigate } from 'react-router-dom'
// import TextField from '@mui/material/TextField'
// import Box from '@mui/material/Box'

// export function SignupStudent() {
//   const [state, setState] = useState({
//     fname: '',
//     lname: '',
//     email: '',
//     password: '',
//     isLoggedIn: false,
//   })
//   // const nv = useNavigate();

//   const handleSubmit = (e) => {
//     e.preventDefault()
//     const { fname, lname, email, password } = state
//     console.log(email, password)

//     fetch('http://localhost:5003/login-user', {
//       method: 'POST',
//       crossDomain: true,
//       headers: {
//         'Content-Type': 'application/json',
//         Accept: 'application/json',
//         'Access-Control-Allow-Origin': '*',
//       },
//       body: JSON.stringify({
//         fname,
//         lname,
//         email,
//         password,
//       }),
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         if (data.status === 'ok') {
//           setState({ ...state, isLoggedIn: true, userId: data.data._id })
//           // nv(`/users_edit_or_new/${data.data._id}`);
//         }
//       })
//   }

//   return (
//     <div className='container'>
//       <div className='col1'>
//         <form onSubmit={handleSubmit} className='form'>
//           <h3 className='login'>Sing up</h3>
//           <h4 className='line2'>Please fill your information below </h4>

//           <Box>
//             <TextField
//               id='outlined-helperText'
//               label='FIrst Name'
//               defaultValue=''
//               onChange={(e) => setState({ ...state, fname: e.target.value })}
//             />

//             <TextField
//               id='outlined-helperText'
//               label='Last Name'
//               defaultValue=''
//               onChange={(e) => setState({ ...state, lname: e.target.value })}
//             />
//             <TextField
//               id='outlined-helperText'
//               label='Email'
//               defaultValue=''
//               onChange={(e) => setState({ ...state, email: e.target.value })}
//             />

//             <TextField
//               id='outlined-password-input'
//               label='Password'
//               type='password'
//               autoComplete='current-password'
//               onChange={(e) => setState({ ...state, password: e.target.value })}
//             />

//             <button type='submit' className='b11'>
//               Next &gt;
//             </button>
//           </Box>

//           <div className='b22'></div>
//         </form>
//       </div>
//     </div>
//   )
// }
