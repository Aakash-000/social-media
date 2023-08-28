import moment from "moment/moment.js";
import { db } from "../connect.js"
import  jwt  from "jsonwebtoken";

export const getSuggestions = (req,res)=> {
    const token  = req.cookies.accessToken;
    if(!token) return res.status(401).json({message:"Not Logged In!"})

    jwt.verify(token,"secretkey", (err,userInfo) => {
        if(err) return res.status(403).json({message:"Token is not Valid!"})
    

    const q = `SELECT * FROM users`
    db.query(q, [], (err,data)=>{
        if(err) return res.status(500).json(err)

        return  res.status(200).json({data:data})  
    })
})

}