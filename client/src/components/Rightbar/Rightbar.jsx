import React, { useContext, useEffect, useState } from 'react'
import './rightbar.css'
import { AuthContext } from '../../context/AuthContext'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { makeRequest } from '../../axios'
// import { Closeicon } from '../../assets/icons/Reacticons'

export function Rightbar() {

    const [state] = useContext(AuthContext)
    const [relationshipdata,setRelationshipData] = useState([])
    const [position,setPosition] = useState();
    const [clicked,setClicked] = useState(false)
   
    const {isLoading,error,data} = useQuery(["suggestion"],()=>
    makeRequest.get("/suggestions").then(res => {
      return res.data.data
    })
  )
    

    const ids = data?.map(({id})=>id)
    const filter1 = data?.filter(({id},index)=>{
    return !ids.includes(id,index+1)
    })
    const filter2 = filter1?.filter(({id})=>{
    return id != state?.info.id})

    
    console.log(data)

    const queryClient = useQueryClient();

  const mutation = useMutation(
    (following) => {
        if(following.validation) return makeRequest.delete("/relationships?userId="+following.id) 
        return makeRequest.post("/relationships",{userId:following.id})        
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["suggestion"]);
      },
    }
  );

  const checkIfFollowing = async(userId,ind)=> {
    let req = await makeRequest.get("/relationships?followedUserId="+userId)
    setRelationshipData((prevValue)=> prevValue = req.data.data)
    setPosition((prevValue) => prevValue = ind)
    setClicked((prevValue)=> prevValue = true)
  }

  console.log(data);

    const handleFollow = (userId,index)=> {
    mutation.mutate({validation:relationshipdata?.includes(state.info.id) && index == position,id:userId})
    }

    // const[updateduser,setupdateduser] = useState([])
    // const[modal,setmodal] = useState(false) 
    // const[getmessage,setgetmessage] = useState([])
    // const[modaldata,setmodaldata] = useState({userName:"",socketId:"",message:""})
    // let onlineuser = []
    
  
    // useEffect(()=>{
      
    //     state.socket.on("getOnlineusers",(data)=>{
    //       setupdateduser((prev)=>prev=[...data])
    //     })
    //     state.socket.on("getMessage",(data)=>{
    //       setgetmessage((prev)=>[...prev,data])
    //     })
    // },[])

    // const handleModal =(username,socketid,index)=> {
    //   setmodal(true)
    //   setmodaldata((prev)=>({...prev,userName:username,socketId:socketid,index:index}))
    // }

    // const closeModal =()=> {
    //   setmodal(false)
    // }

    // const handleMessage = (receivername,socketid,message,sendername)=> {
    //   state.socket.emit("sendMessage",{receivername,socketid,message,sendername})
      
    // }

    // console.log(onlineuser)
    // console.log(getmessage)

    return (

      <div className="rightBar">
      <div className="container">
        <div className="item">
          <span className="title">Check if Friends</span>
          {filter2?.map((item,index)=>(
            <div className="user" key={index}>
            <div className="userInfo">
              <img
                src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
              />
              <span>{item.username}</span>
            </div>
            <div className="buttons">
              <button onClick={()=>checkIfFollowing(item.id,index)} disabled={relationshipdata?.includes(state.info.id) && (index == position) ? true : false}>
              {relationshipdata?.includes(state.info.id) && index == position ? 
              "Following"  : !relationshipdata?.includes(state.info.id) && index == position ? "Not Followed" :
              "Check"}
              </button>
             {clicked && 
             <button onClick={()=>handleFollow(item.id,index)} disabled={position == index ? false : true}>
              {relationshipdata?.includes(state.info.id) && index == position ? "Unfollow" : "Follow"}
              </button>}
            </div>
            </div>
          ))}
        </div>
        <div className="item">
          <span className="title">Latest Activities</span>
          <div className="user">
            <div className="userInfo">
              <img
                src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
              />
              <p>
                <span>Jane Doe</span> 
              </p>
            </div>
            <span>1 min ago</span>
          </div>
          <div className="user">
            <div className="userInfo">
              <img
                src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
              />
              <p>
                <span>Jane Doe</span> 
              </p>
            </div>
            <span>1 min ago</span>
          </div>
          <div className="user">
            <div className="userInfo">
              <img
                src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
              />
              <p>
                <span>Jane Doe</span> 
              </p>
            </div>
            <span>1 min ago</span>
          </div>
          <div className="user">
            <div className="userInfo">
              <img
                src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
              />
              <p>
                <span>Jane Doe</span> 
              </p>
            </div>
            <span>1 min ago</span>
          </div>
        </div>
        <div className="item">
          <span className="title">Online Friends</span>
          <div className="user">
            <div className="userInfo">
              <img
                src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
              />
              <div className="online" />
              <span>Jane Doe</span>
            </div>
          </div>
          <div className="user">
            <div className="userInfo">
              <img
                src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
              />
              <div className="online" />
              <span>Jane Doe</span>
            </div>
          </div>
          <div className="user">
            <div className="userInfo">
              <img
                src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
              />
              <div className="online" />
              <span>Jane Doe</span>
            </div>
          </div>
          <div className="user">
            <div className="userInfo">
              <img
                src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
              />
              <div className="online" />
              <span>Jane Doe</span>
            </div>
          </div>
          <div className="user">
            <div className="userInfo">
              <img
                src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
              />
              <div className="online" />
              <span>Jane Doe</span>
            </div>
          </div>
          <div className="user">
            <div className="userInfo">
              <img
                src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
              />
              <div className="online" />
              <span>Jane Doe</span>
            </div>
          </div>
          <div className="user">
            <div className="userInfo">
              <img
                src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
              />
              <div className="online" />
              <span>Jane Doe</span>
            </div>
          </div>
          <div className="user">
            <div className="userInfo">
              <img
                src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
              />
              <div className="online" />
              <span>Jane Doe</span>
            </div>
          </div>
          <div className="user">
            <div className="userInfo">
              <img
                src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
              />
              <div className="online" />
              <span>Jane Doe</span>
            </div>
          </div>
          <div className="user">
            <div className="userInfo">
              <img
                src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
              />
              <div className="online" />
              <span>Jane Doe</span>
            </div>
          </div>
          <div className="user">
            <div className="userInfo">
              <img
                src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
              />
              <div className="online" />
              <span>Jane Doe</span>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}
{/* <div className="rightbar_item_online_info">
          {updateduser.map((value,index)=>(
              <div className="rightbar_item_online_user_userinfo" key={index} onClick={()=>handleModal(value.username,value.socketId,index)}>
                <img src={""} alt="" className="rightbar_item_online_user_userinfo_image" />
                <div className="rightbar_item_online_user_userinfo_showonline"></div>
                <span className="rightbar_item_online_user_userinfo_span">
                    {value.username == state.username ? value.username  + " " + '(Me)': value.username}
                    </span>
              </div>
          ))}
          </div>  
        </div>
        {modal && 
          <div className="rightbar_item_online_modal">
            <div className="rightbar_item_online_modal_header">
              <p className="rightbar_item_online_modal_header_p">
                Message {modaldata.userName}
              </p>
              <div className="rightbar_item_online_modal_header_close" onClick={closeModal}>
              <Closeicon/>
              </div>
            </div>
            <div className="rightbar_item_online_modal_upperhalf">
            {getmessage.map((value)=>( 
            <div className="rightbar_item_online_modal_upperhalf_message">
              {(value.sendername == modaldata.userName) ? (
              <p className="rightbar_item_online_modal_upperhalf_message_p">
                {value.sendername}:{value.message}
                </p>
              ):("")}
              </div>
            ))}
            </div>
            <div className="rightbar_item_online_modal_lowerhalf">
            <img src={""} className="rightbar_item_online_modal_lowerhalf_image" />
            <input 
            type="text" name="message" 
            onChange={(e)=>setmodaldata((prev)=>({...prev,message:e.target.value}))} 
            placeholder="Write Message" id="rightbar_item_online_modal_lowerhalf_input" 
            value={modaldata.message}/>
            <button className="rightbar_item_online_modal_lowerhalf_button" onClick={
              ()=>handleMessage(modaldata.userName,modaldata.socketId,modaldata.message,state.username)}>Send</button>
            </div>
           */}
