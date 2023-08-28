import React, { useContext,useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {Homeicon,Moonicon,Appicon,Searchicon,
Personicon,Emailicon,Notificationicon} from '../../assets/icons/Reacticons'
import { AuthContext } from '../../context/AuthContext'
import './navbar.css'


export function Navbar() {
  
  const [state,setState] = useContext(AuthContext)
  const [notification,setnotification] = useState([])
  const[shownotification,setshownotification] = useState(false)
  const[logoutbar,setlogoutbar] = useState(false)
  const navigate = useNavigate();

  // useEffect(()=>{
  //   state.socket.on("getNotification",(data)=>{
  //     setnotification((prev)=>[...prev,data])
  //   })
    
  // },[])

  const handleshowNotification = ()=> {
    setshownotification((prevValue)=>prevValue = !prevValue)
  }

  const handleLogged = ()=> {
    setlogoutbar((prevValue)=>prevValue = !prevValue)
  }


  const handleLogout = ()=> {
      sessionStorage.removeItem("user")
      navigate("/login")
  }

  return (
    <div className='navbar'>
        <div className="navbar_left">
            <Link to="/">
            <span className="navbar_left_span">FeedsGo</span>
            </Link>
            <Homeicon/>
            <Moonicon/>
            <Appicon/>
            <div className="navbar_left_searchbar">
                <Searchicon/>
                <input type="text" placeholder="Search..."/>
            </div>
        </div>
        <div className="navbar_right">
        <Personicon/>
        <Emailicon/>
        <div className="navbar_right_notification" onClick={handleshowNotification}>
        <Notificationicon />
        </div>
        {
        shownotification ? (
        <div className="navbar_right_notification_container">
          {notification.map((value,index)=>(
            <ul className="navbar_right_notification_container_ul" key={index}>
              <li className="navbar_right_notification_container_ul_li">
                {`${value.senderName} ${value.type == 0 ? "liked" : "disliked"} your post`}
              </li>
            </ul>
          ))}
        </div>
        ):(
          <>
          {notification.length > 0 ? 
          <p className='navbar_right_notification_container_count_show'>
            {notification.length}
            </p> : 
          ''}
          </>
        )
        }
        <div className="navbar_right_user">
            <img src="https://images.pexels.com/photos/3228727/pexels-photo-3228727.jpeg?auto=compress&cs=tinysrgb&w=1600" 
            alt="" className="navbar_right_user_image" />
            <span className="navbar_right_user_span" onClick={handleLogged}>{state.info.username}</span>
            {logoutbar && <span className="navbar_right_user_span_logged_status" onClick={handleLogout}>Logout</span>}
        </div>
        </div>
    </div>
  )
}
