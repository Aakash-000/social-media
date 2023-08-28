import React,{useContext, useEffect, useState} from 'react'
import { Link } from 'react-router-dom';
import { ThreeDoticon,FavBorderOutlinedicon,FavOutlinedicon,Textsmsicon,Shareicon} from '../../assets/icons/Reacticons';
import { AuthContext } from '../../context/AuthContext';
import { Comments } from '../Comments/Comments';
import './post.css'
import moment from  "moment"
import { makeRequest } from '../../axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export function Post(props) {

    const [state] = useContext(AuthContext)
    // const {sendername,description,posttime} = value
    const [comments,setcomments] = useState(false)
    // const [liketype,setliketype] = useState(0)

    
    const {isLoading,error,data} = useQuery(["likes",props.item.id],()=>
    makeRequest.get("/likes?postId="+props.item.id).then(res => {
      return res.data.data
    })
  )

  const queryClient = useQueryClient();

  const mutation = useMutation(
    (liked) => {
        if(liked) return makeRequest.delete("/likes?postId="+props.item.id) 
        return makeRequest.post("/likes",{postId:props.item.id})        
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["likes"]);
      },
    }
  );

  console.log(data);

    const handleComment = ()=> {
        setcomments((prevValue)=>prevValue = !prevValue)
    }
    console.log(props);

    const handleLike = ()=> {
        mutation.mutate(data?.includes(state.info.id))
    }

    // useEffect(()=>{
    // function likeType(){
    //     if(liked == false){
    //         setliketype(0)
    //     }else{
    //         setliketype(1)
    //     }
    // } 
    // likeType()
    // },[liked])
   
    // const handleLike = (liketype) => {
    //      state.socket.emit("sendNotification",{
    //         senderName:state.username,
    //         receiverName: sendername,
    //         type : liketype
    //      }) 
    //      setliked(!liked)
    // }

  return (
    <div className="post">
        <div className="container_post">
            <div className="user">
                <div className="userinfo_firstpart">
                    <img src={""} alt="" className="userinfo_firstpart_image" />
                    <div className="userinfo_firstpart_details">
                        <Link to={`/profile/${props.item.userId}`} style={{textDecoration:'none',color:'inherit'}}>
                            <span className="userinfo_firstpart_details_span_name">
                                {props.item.username}
                            </span>
                            <span className="userinfo_firstpart_details_span_activity">
                                Posted {moment(props.item.createdAt).fromNow()}
                            </span>
                        </Link>
                    </div>
                </div>
               <ThreeDoticon/>
            </div>
            <div className="usercontent">
                <p className="usercontent_p">
                    {props.item.desc}
                </p>
                <img src={"./upload/"+props.item.img} alt="" className="usercontent_image" />
            </div>
            <div className="userinteraction">
                <div className="userinteraction_itemone">
                { data?.includes(state.info.id) ? <div onClick={handleLike}><FavOutlinedicon/></div> 
                : <div onClick={handleLike}><FavBorderOutlinedicon/></div>}{data?.length} Likes
                </div>
                <div className="userinteraction_itemtwo" onClick={handleComment}>
                <Textsmsicon/>
                Comment
                </div>
                <div className="userinteraction_itemthree">
                <Shareicon/>
                Share
                </div>
            </div>
            {comments ? <Comments value={props.item.id}/> : ""}
        
    </div>
    </div>
  )
}
