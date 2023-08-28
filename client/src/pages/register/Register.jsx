
import React,{ useState }  from 'react'
import { useEffect } from 'react';
import { Link } from 'react-router-dom'
import './register.css'

export function Register() {

  const[registerdetails,setregisterdetails] = useState({username:"",password:"",email:"",registeredcheck:false});

  const changeHandler = (e)=> {
    setregisterdetails((prevValue)=>({...prevValue,[e.target.name]:e.target.value}))
  }
  
  const changeHandlerCheck = (e) => {
    setregisterdetails((prevValue)=>({...prevValue,[e.target.name]:e.target.checked}))
  }

    
     const submitHandler = async(e)=> {
      e.preventDefault();
      try{
      const req =  await fetch(`http://localhost:8000/api/auth/register`,
      {method:'POST',
      body:JSON.stringify(registerdetails),
      headers:{
        "Content-Type":"application/json"
      }})
      const res = await req.json()
      if(res.message == "User Already Exists!"){
        alert("User Already Exists!")
      }else{
        alert("Registered Successfully!")
        setregisterdetails({...registerdetails,username:"",password:"",email:"",registeredcheck:false})
      }
    }catch(err){
      console.log(err)
   }
}



  return (
    <div className='register'>
        <div className='card'>
            <div className='card_left_register'>
                <h1 className='card_left_register_h1'>Register</h1>
                <form className='card_left_register_form' onSubmit={submitHandler}>
                    <input type="text" required onChange={changeHandler} name="username" placeholder='Username' value={registerdetails.username}/>
                    <input type="password" required onChange={changeHandler}  name="password" placeholder='Password' value={registerdetails.password}/>
                    <input type="email" required onChange={changeHandler}  name="email" placeholder='Email' value={registerdetails.email}/>
                    <div className='card_left_register_form_check'>
                    <input id="checkbox" required type="checkbox" onChange={changeHandlerCheck} name="registeredcheck" checked={registerdetails.registeredcheck}/>
                    <p className='card_left_register_form_p'>I agree to the terms and condition of registration!</p>
                    </div>   
                    <button className='card_left_register_form_button'>Register</button>                 
                </form>
            </div>
            <div className='card_right'>
            <h1 className='card_right_h1'>Hello World</h1>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. 
            Eaque sequi maiores ratione in odio enim officia libero a autem iste! Provident sequi inventore labore tempora sed natus officiis explicabo aliquid.
            </p>
            <span className='card_span_right'>Do you have an account?</span>
            <Link to="/login">
            <button className='card_right_button'>Login</button>
            </Link>
            </div>
        </div>
    </div>
  )
}
