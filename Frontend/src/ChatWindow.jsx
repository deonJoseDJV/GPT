
import "./ChatWindow.css"
import Chat from "./Chat.jsx"
import {MyContext} from "./MyContext.jsx";
import { useContext,useState,useEffect } from "react";
import {ScaleLoader} from "react-spinners";

const ChatWindow = () => {
  const {prompt,setPrompt,reply,setReply,currThreadId,prevChats,setPrevChats,setNewChat}=useContext(MyContext);
  const [loading,setLoading]=useState(false);
  const [isOpen,setIsOpen]=useState(false);//set default fasle
  const getReply=async()=>{
    setLoading(true);
    //to avoid the start new chat thing again always
    setNewChat(false);
    const options={
      method:"POST",
      headers:{
        "Content-type":"application/json"
      },
      body:JSON.stringify({
        message:prompt,
        threadId:currThreadId
      })
    }
    try{
      const response=await fetch("http://localhost:8080/api/chat",options);
      const res=await response.json();
      setReply(res.reply);
    }
    catch(err){
      console.log("Error while fetching reply:",err);
    }
    setLoading(false);
  }

  //append new chat to previous chats
  useEffect(()=>{
    if (prompt && reply){
      setPrevChats(prevChats=>{
        [...prevChats,{
          role:"user",
          content:prompt
        },{
          role:"assistant",
          content:reply
        }]
      })

    }
    setPrompt("");

  },[reply]);


  const handleProfileClick=()=>{
    setIsOpen(!isOpen);
  }

  
  return (
    <div className='chatWindow'>
      <div className='navbar'>
        <span>GPT <i class="fa-solid fa-arrow-down"></i></span>
        <div className="userIconDiv" onClick={handleProfileClick}>
          <span className='userIcon'><i class="fa-solid fa-user"></i></span>

        </div>

      </div>
      {
        isOpen && 
        <div className="dropDown">
          
          <div className="dropDownItem"><i className="fa-solid fa-gear"></i>Settings</div>
          <div className="dropDownItem"><i className="fa-solid fa-angle-up"></i>Upgrade plan</div>
          <div className="dropDownItem"><i className="fa-solid fa-arrows-left-right-to-line"></i>Log out</div>
        </div>
      }

      <Chat />
      <ScaleLoader color="#fff" loading={loading} className="loader">

      </ScaleLoader>
      
      <div className="chatInput">
        <div className="inputBox">
          <input  placeholder='Ask anything'
          value={prompt}
          onChange={(e)=>setPrompt(e.target.value)}
          onKeyDown={(e)=>e.key==="Enter"? getReply():''}
          >
              

          </input>
          <div id="submit" onClick={getReply} className="submit"><i class="fa-solid fa-paper-plane"></i></div>
        </div>
        <p className='info'>
          GPT can make mistakes, Check important info, See Cookie Preferences.
        </p>

      </div>
    </div>
  )
}

export default ChatWindow