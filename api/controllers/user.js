import { db } from "../connect.js"
import jwt from "jsonwebtoken"

export const getUser = (req,res)=>{
    const userId = req.params.userId;

    const q = "SELECT * FROM users WHERE id = (?)";
    
    db.query(q, [userId], (err,data)=>{
        if(err) return res.status(500).json(err)
        const {password,...other} = data[0]
        return res.status(200).json({data:other})
    })
}
export const updateUser = (req,res)=>{

    const token  = req.cookies.accessToken

    if(!token) return res.status(401).json({message:"Not Logged In!"})

    jwt.verify(token,"secretkey", (err,userInfo) => {
        if(err) return res.status(403).json({message:"Token is not Valid!"})

    const q = "UPDATE users SET `username`= ? , `city` = ?, `website` = ?, `profilePic` = ?, `coverPic` = ? WHERE id = ?";
    
    const value = [req.body.username,req.body.city,req.body.website,req.body.profilePic,req.body.coverPic]

    db.query(q, [...value,userInfo.id], (err,data)=>{
        if(err) return res.status(500).json(err)
        if(data.affectedRows > 0) return res.status(201).json({message:"Updated Successfully!"}) 
        return res.status(200).json({message:"You can update only your Post!"})
    })
})
}