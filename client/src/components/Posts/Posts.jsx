import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Post } from "../post/Post";
import "./posts.css";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";

export function Posts({userId}) {
  const [state] = useContext(AuthContext)
  

  const {isLoading,error,data} = useQuery(["posts"],()=>
    makeRequest.get("/posts?userId="+userId).then(res => {
      return res.data.data
    })
  )


  console.log(data)
  
  // const [displaypost, setdisplaypost] = useState([])
  // const[activepost,setactivepost] = useState(false)
  // const[itemadded,setitemadded] = useState(false)

  // const changeHandler = (e) => {
  //   setpost((post) => ({ ...post, desc: e.target.value }))
  // }

  // useEffect(() => {
  //   let isSubscribed = true
  //   function displayPost() {
  //     state.socket.on("getPost",(data)=>{
  //       setdisplaypost((prev)=> [...prev,data])
  //       })
  //       if(displaypost.length < 0){
  //         setactivepost(false)
  //       }else{
  //         setactivepost(true)
  //       }
  //     }
  //   displayPost()
  //   return () => {
  //     isSubscribed = false
  //   }
  //   }, []);

  //   const postHandler = async (e) => {
  //   e.preventDefault()
  //   if (post.desc !== "" && post.desc.length > 6) {
  //     state.socket.emit("sendPost", {
  //       sendername:post.name,
  //       description:post.desc,
  //       posttime: `${new Date().getHours() > 12 ? new Date().getHours()-12:new Date().getHours()}:
  //       ${new Date().getMinutes()}:
  //       ${new Date().getSeconds()}${new Date().getHours() > 12 ? 'PM' : 'AM'}`
  //     })
  //     setpost((prev)=> ({ ...prev, desc:" "}))
  //   } else {
  //     alert("Field is empty or Write content Longer")     
  //   }
  // }

  return (
    <div className="posts">
              {isLoading  ? "Loading..." : error ? "Error Loading" : data?.map((value, index) => (
              <Post item={value}  key={value.id}/>
              ))}
    </div>
  );
}
