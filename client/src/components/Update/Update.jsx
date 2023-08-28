import React, { useContext, useState } from 'react'
import './update.css'
import { makeRequest } from '../../axios'
import { AuthContext } from '../../context/AuthContext'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const Update = (props) => {

    const [details,setDetails] = useState({username:props.user.username,city:props.user.city,website:props.user.website})
    const[coverimg,setCoverImg] = useState(null)
    const[profileimg,setProfileImg] = useState(null)
    const [state] = useContext(AuthContext);

    const handleChange = (e)=> {
        setDetails((prevValue)=>({...prevValue,[e.target.name]:e.target.value}))
    }

    console.log(coverimg,profileimg)
    const upload = async (file) => {
        try {
          const formData = new FormData();
          formData.append("file", file);
          const res = await makeRequest.post("/upload", formData);
          return res.data.message;
        } catch (err) {
          console.log(err);
        }
      };
      

  const queryClient = useQueryClient();

  const mutation = useMutation(
    (user) => {
      return makeRequest.put("/users", user);
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["user"]);
      },
    }
  );

  const handleClick = async (e) => {
    e.preventDefault();
    let coverUrl = props.user.coverPic;
    let profileUrl = props.user.profilePic;
    coverUrl = coverimg && await upload(coverimg)
    profileUrl = profileimg && await upload(profileimg)
    mutation.mutate({ ...details,coverPic:coverUrl,profilePic:profileUrl});
    setDetails((prevValue)=> ({...prevValue,username:"",city:"",website:"" }))
    setCoverImg((prevValue)=> prevValue = null)
    setProfileImg((prevValue)=> prevValue = null)
    props.update((prevValue)=> prevValue = false)
  };
    
    return (
    <div className="update">
        <div className="top">
        <h4 style={{fontSize:"20px"}}>Update Info</h4>
        <span onClick={()=>props.update((prevValue)=> prevValue = false)} style={{cursor:'pointer'}}>
        <svg xmlns="http://www.w3.org/2000/svg" height="1.5em" viewBox="0 0 384 512"><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>
        </span>
        </div>
        <div className="middle">
            <form className="middleform" onSubmit={handleClick}>
                <div className="itemone">
                <label htmlFor="username">Username:</label>
                <input type='text' required name="username" onChange={handleChange} value={details.username}/>
                </div>
                <div className="itemtwo">
                <label htmlFor="city">City:</label>
                <input type='text' required name="city" onChange={handleChange} value={details.city}/>
                </div>
                <div className="itemthree">
                <label htmlFor="website">Website:</label>
                <input type='text' required name="website" onChange={handleChange} value={details.website}/>
                </div>
                <div className="itemfour">
                <label htmlFor="coverimg">Cover Image:</label>
                <input type="file" required name="coverimg" onChange={(e)=>setCoverImg((prevValue)=>prevValue = e.target.files[0])}/>
                </div>
                <div className="itemfive">
                <label htmlFor="profileimg">Profile Image:</label>
                <input type="file"required name="profileimg" onChange={(e)=>setProfileImg((prevValue)=>prevValue = e.target.files[0])}/>
                </div>
                
                <button type="submit" className="update_button">Submit</button>
            </form>
        </div>
    </div>
  )
}

export default Update