import {useEffect,useState} from 'react'
import io from 'socket.io-client'
const socket=io.connect("http://localhost:4000")
const Chat=()=>{
    
    const [room,setRoom]=useState(' ')
    const [message,setMessage]=useState(' ')
    const [recieved_data,setRecieved_data]=useState(' ')
   const onSubmitHandler=()=>{
       alert("hai")
        socket.emit("send_message",{message,room})

    }
    useEffect(()=>{
socket.on("recieved_data",(data)=>{
    setRecieved_data(data.message)
})
    },[socket])
    const JoinRoom=()=>{
        if(room!==""){
            alert(room)
            socket.emit("join_room",room)
        }
    }

    return(
        <div>
            Chat box<br/>
            <input placeholder='Room Number' onChange={(event)=>setRoom(event.target.value)}></input>
            <button onClick={JoinRoom}>Join Room</button><br/><br/>
         <br/>   <input placeholder="Enter message" onChange={(event)=>setMessage(event.target.value)}></input>
            <button onClick={onSubmitHandler}>Submit</button>
            {recieved_data  &&<> <h3>Message:</h3>     <p>{recieved_data}</p> </> }
        </div>
    )
}
export default Chat