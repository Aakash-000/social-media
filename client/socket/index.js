import { Server } from "socket.io";

const io = new Server({ cors:{
    origin:"http://localhost:3000"
}});

let onlineUsers = [];
 
const addnewUser = (socketId,username) => {
    !onlineUsers.some((user)=> user.username === username) && 
    onlineUsers.push({socketId,username})

}   

const removeUser = (socketId)=>{
    let dataindex = 0
     let filteredUserIndex = onlineUsers.filter((user) => 
        user.socketId === socketId
    )
    let f1 = filteredUserIndex[0].socketId
    for(let data of onlineUsers){
        for(let item in data){
            if(data[item] === f1){
                dataindex = onlineUsers.indexOf(data)
                onlineUsers.splice(dataindex,1)
            }
        }
    }
    
}

const getUser = (username) => {
    return onlineUsers.find((user)=> user.username === username)
}

io.on("connection", (socket) => {


    socket.on("sendNotification",({senderName,receiverName,type})=>{
        const receiver = getUser(receiverName)
        io.to(receiver.socketId).emit("getNotification",{senderName,type})
    })
    
    socket.on("sendPost",({sendername,description,posttime})=>{
        io.emit("getPost",{sendername,description,posttime})
    })
    
    socket.on("newUser",(username)=>{
        addnewUser(socket.id,username)
        io.emit("getOnlineusers",onlineUsers)
    })


    socket.on("sendMessage",({receivername,socketid,message,sendername})=>{
        socket.to(socketid).emit("getMessage",{receivername,socketid,message,sendername})
    })
    
    socket.on("logout",(socketId)=>{
        removeUser(socketId)
        io.emit("getOnlineusers",onlineUsers)
    })

});

io.listen(5000);



