import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';


export function SignupStudent(){

    const [fname, setfname]= useState("");
    const [lname, setlname]=useState("");
    const [email, setemail]=useState("");
    const [password, setpassword]=useState("");


    const handleSubmit =  () => {



    }

    return(
       
       <>
       <div>
        <h1>
            This is sign-up page.



        </h1>
       </div>
     </>
    );
}