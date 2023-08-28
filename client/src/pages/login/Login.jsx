import React, { useContext, useState } from 'react'
import { useEffect } from 'react';
import { Link ,  useNavigate} from 'react-router-dom';
import './login.css'
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
// import { io } from "socket.io-client";


export function Login() {

  // const[socket,setsocket] = useState(null)
  const[state,setState] = useContext(AuthContext)
  const[loginDetails,setloginDetails] = useState({username:"",password:""})
  const navigate = useNavigate()

  const handleChange = (e)=> {
    setloginDetails((loginDetails)=>({...loginDetails,[e.target.name] : e.target.value}))
  }

  // useEffect(()=>{
  //   let val = true
  //   if(val){
  //     setsocket((prevValue) => prevValue = io("http://localhost:5000"))
  //   }
  //   return ()=> {
  //     val = false
  //   }
  // },[])


    const handleLogin = async(e)=> {
    e.preventDefault(); 
    
    try{
     const req = await axios.post("http://localhost:8000/api/auth/login",loginDetails,{
     headers:{
      "Content-Type":"application/json"
     }, 
     withCredentials:true
     })
      const res = req
      console.log(res)
      if(res.message == "User Not Found!"){
        alert("User is not Registered!")
      }else if(res.message == "Wrong Password or Username!"){
        alert("Incorrect Username or Password!")
      }
        console.log(res)
        sessionStorage.setItem("user",JSON.stringify(res?.data?.data))
        setState((prevValue)=>({...prevValue,info:res.data.data}))
        navigate("/")
      // setState((state)=>({...state,socket:socket}))
      // socket.emit("newUser",loginDetails.username)

      setloginDetails((prevValue)=>({...prevValue,username:"",password:""}))

    }catch(err){
      console.log(err)
    }
  }
    
  return (
    <div className='login'>
      {console.log(state)}
        <div className='card'>
            <div className='card_left_login'>
            <h1 className='card_left_login_h1'>Hello World</h1>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. 
            Eaque sequi maiores ratione in odio enim officia libero a autem iste! Provident sequi inventore labore tempora sed natus officiis explicabo aliquid.
            </p>
            <span className='card_span_left_login'>Don't have an account?</span>
            <Link to="/register"><button className='card_left_login_button'>Register</button></Link>
            </div>
            <div className='card_right_login'>
                <h1 className='card_right_login_h1'>Login</h1>
                <form className='card_right_login_form' onSubmit={handleLogin}>
                    <input type="text" onChange={handleChange} name="username" required placeholder='Username' value={loginDetails.username}/>
                    <input type="password" onChange={handleChange} name="password" required placeholder='Password' value={loginDetails.password}/>
                    
                    <button className='card_right_login_form_button' type='submit'>Login</button>
                </form>
            </div>
        </div>
    </div>
  )
}
