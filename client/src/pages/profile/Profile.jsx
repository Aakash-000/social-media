import React, { useContext, useState } from 'react'
import FacebookTwoToneIcon from "@mui/icons-material/FacebookTwoTone";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import TwitterIcon from "@mui/icons-material/Twitter";
import PlaceIcon from "@mui/icons-material/Place";
import LanguageIcon from "@mui/icons-material/Language";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import './profile.css'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { makeRequest } from '../../axios';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { Posts } from '../../components/Posts/Posts';
import Update from '../../components/Update/Update';

export function Profile() {

  const[openupdate,setOpenUpdate] = useState(false)
  const {userId} = useParams()
  const id = parseInt(userId)
  const [state] = useContext(AuthContext);

  const {isLoading,error,data:firstdata} = useQuery(["user"],()=>
    makeRequest.get("/users/find/"+userId).then(res => {
      return res.data.data
    })
  )

  const {data:relationshipdata} = useQuery(["relationship"],()=>
    makeRequest.get("/relationships?followedUserId="+userId).then(res => {
      return res.data.data
    })
  )
  
    console.log(relationshipdata)
    console.log(firstdata)

    const queryClient = useQueryClient();

  const mutation = useMutation(
    (following) => {
        if(following) return makeRequest.delete("/relationships?userId="+userId) 
        return makeRequest.post("/relationships",{userId})        
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["relationship"]);
      },
    }
  );

  console.log(firstdata);

    const handleFollow = ()=> {
    mutation.mutate(relationshipdata?.includes(state.info.id))
    }

  return (
    <>    
    {isLoading ? "Loading..." : (
    <div className="profile">
      <div className="images">
        <img
          src={"/upload/"+firstdata?.coverPic}
          alt="ItemOne"
          className="coverimg"
        />
        <img
          src={"/upload/"+firstdata?.profilePic}
          alt="ItemTwo"
          className="profilePic"
        />
      </div>
      <div className="profileContainer">
        <div className="uInfo">
          <div className="left">
            <a href="http://facebook.com">
              <FacebookTwoToneIcon fontSize="medium" />
            </a>
            <a href="http://facebook.com">
              <InstagramIcon fontSize="medium" />
            </a>
            <a href="http://facebook.com">
              <TwitterIcon fontSize="medium" />
            </a>
            <a href="http://facebook.com">
              <LinkedInIcon fontSize="medium" />
            </a>
            <a href="http://facebook.com">
              <PinterestIcon fontSize="medium" />
            </a>
          </div>
          <div className="center">
            <span className="title">{firstdata.username}</span>
            <div className="info">
              <div className="item">
                <PlaceIcon />
                <span>{firstdata.city}</span>
              </div>
              <div className="item">
                <LanguageIcon />
                <span>{firstdata.website}</span>
              </div>
            </div>
            {id === state.info.id ? (
            <button className="center_button" onClick={()=>setOpenUpdate((prevValue)=> prevValue = true)}>Update</button>):(
            <button className="center_button" onClick={handleFollow}>
            {relationshipdata?.includes(state.info.id) ? "Following" : "Follow"}</button>)}
          </div>
          <div className="right">
            <EmailOutlinedIcon />
            <MoreVertIcon />
          </div>
        </div>
        <Posts userId={userId} />
      </div>
      {openupdate && <Update update={setOpenUpdate} user={firstdata}/>}
    </div>
    )}</>
  )
}
