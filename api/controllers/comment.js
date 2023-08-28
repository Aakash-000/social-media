import {db} from "../connect.js"
import  jwt  from "jsonwebtoken";
import moment from "moment/moment.js";

export const getComments = (req,res) => {
   

    const q = `SELECT c.*,u.id AS userId,username,profilePic FROM comments AS c JOIN users AS u ON (u.id = c.userId)
    WHERE c.postId = ? ORDER BY c.createdAt DESC`

    db.query(q,[req.query.postId], (err,data)=>{
        if(err) return res.status(500).json(err)

        return  res.status(200).json({data:data})  
    })
}

export const addComment = (req,res)=> {

    const token  = req.cookies.accessToken;
    if(!token) return res.status(401).json({message:"Not Logged In!"})

    jwt.verify(token,"secretkey", (err,userInfo) => {
        if(err) return res.status(403).json({message:"Token is not Valid!"})
    

    const q = "INSERT INTO comments (`desc`,`createdAt`,`userId`,`postId`) VALUES (?)"

    const values = [
        req.body.desc,
        moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
        userInfo.id,
        req.query.postId
    ]

    db.query(q, [values], (err,data)=>{
        if(err) return res.status(500).json(err)

        return  res.status(200).json({message:"Comment has been added!"})  
    })
})

}