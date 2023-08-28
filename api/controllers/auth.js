import { db } from "../connect.js"
import bcrypt from "bcryptjs"
import  jwt  from "jsonwebtoken"

export const register = (req,res) => {
    
    const q = "SELECT * FROM users WHERE email = ?"
    


    db.query(q,[req.body.email], (err,data)=>{
        if(err) return res.status(500).json(err)

        if(data.length) return res.status(409).json({message:"User Already Exists!"})

        const salt = bcrypt.genSaltSync(10)
        const hashedpw = bcrypt.hashSync(req.body.password,salt)

        const q = "INSERT INTO users (`username`,`email`,`password`) VALUES (?)"
        
        const values = [req.body.username,req.body.email,hashedpw]
        db.query(q,[values],(err,data)=>{
            if(err) return res.status(500).json(err)
            return res.status(200).json({message:"User has been created!"})

        })  
    })
}
export const login = (req,res)=> {
        const q = "SELECT * from users WHERE username = ?"

        db.query(q,[req.body.username], (err,data)=>{
            if(err) return res.status(500).json(err)
            if(data.length === 0) return res.status(404).json({message:"User Not Found!"})
            
            const checkpw = bcrypt.compareSync(req.body.password,data[0].password)

            if(!checkpw) return res.status(400).json({message:"Wrong Password or Username!"})


            const token = jwt.sign({id:data[0].id},"secretkey")

            const {password,...other} = data[0]
            
            res.cookie("accessToken",token, {
                httpOnly : true
            }).status(200).json({data:other})
        })
}
export const logout = (req,res) => {
        res.clearCookie("accessToken",{
            secure:true,
            sameSite:"none",
        }).status(200).json("User has been logged out!")
}   