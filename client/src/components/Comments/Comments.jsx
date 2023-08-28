import React, { useState } from 'react'
import './comments.css'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { makeRequest } from '../../axios'
import moment from 'moment'

export function Comments(props) {

    const[comment,setComment] = useState("")

    const {isLoading,error,data} = useQuery(["comments"],()=>
    makeRequest.get("/comments?postId="+props.value).then(res => {
      return res.data.data
    })
  )

  const queryClient = useQueryClient();

  const mutation = useMutation(
    (newComment) => {
      return makeRequest.post("/comments?postId="+props.value, newComment);
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["comments"]);
      },
    }
  );

  const handleClick = async (e) => {
    e.preventDefault();
    
    mutation.mutate({desc:comment});
    setComment((prevValue)=> prevValue = "");
    
  };


  console.log(data)
  return (
    <div className='comments'>
        <div className="write_comments">
            <img src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="" className="write_comments_image" />
            <input type="text" value={comment} onChange={(e)=>setComment((prevValue)=>prevValue = e.target.value)} 
            placeholder="Write Comments" className="write_comments_input" />
            <button className="write_comments_button" onClick={handleClick}>Comment</button>
        </div>
        {isLoading ? "Loading..." : error ? "Error Loading" 
        : data.map((value,index)=>(
            <div className="comments_comment" key={index}>
                <img src={value.profilePicture} alt="" className="comments_comment_profilepic" />
                <div className="comments_comment_userinfo">
                    <span className="comments_comment_userinfo_span">
                        {value.username}
                    </span>
                    <p className="comments_comment_userinfo_p">
                        {value.desc}
                    </p>
                </div>
                <span className="comments_comment_span">
                    Created {moment(value.createdAt).fromNow()}
                </span>
            </div>
        ))}
    </div>
  )
}
