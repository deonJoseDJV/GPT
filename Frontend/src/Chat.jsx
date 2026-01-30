import "./Chat.css";
import React, { useContext, useState, useEffect } from "react";

import { MyContext } from "./MyContext.jsx";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
//this one helps in more styled generation by gpt
import "highlight.js/styles/github-dark.css";
const Chat = () => {
  //state variables
  const { newChat, prevChats, reply } = useContext(MyContext);
  const [ latestReply, setLatestReply ] = useState(null);
  useEffect(() => {
    if (reply === null) {
      setLatestReply(null); //prev chat load
      return;
    }
    //latestReply separate=> typing effect create
    if (!prevChats?.length) return;

    const content = reply.split(" "); //indiviual words
    let idx = 0;
    const interval = setInterval(() => {
      setLatestReply(content.slice(0, idx + 1).join(""));
      idx++;
      if (idx >= content.length) clearInterval(interval);
    }, 40);

    return () => clearInterval(interval);
  }, [prevChats, reply]);
  return (
    <>
      {newChat && <h1>Start a new Chat</h1>}

      {/* dynamic chat window */}
      <div className="chats">
        {
          //here ?.slice(0,-1) means all except last one
          prevChats?.slice(0, -1).map((chat, idx) => (
            <div
              className={chat.role === "user" ? "userDiv" : "gptDiv"}
              key={idx}
            >
              {chat.role === "user" ? (
                <p className="userMessage">{chat.content}</p>
              ) : (
                //for this we get the formatted one with the  help of react markdown and rehype highlight
                <ReactMarkdown
                  rehypePlugins={[rehypeHighlight]}
                  className="gptMessage"
                >
                  {chat.content}
                </ReactMarkdown>
              )}
            </div>
          ))
        }
{/* ------ternary version of below--- */}
        {prevChats.length > 0 && (
          <>
            {latestReply === null ? (
              <div className="gptDiv" key={"non-typing"}>
                <ReactMarkdown
                  rehypePlugins={[rehypeHighlight]}
                  className="gptMessage"
                >
                  {prevChats[prevChats.length - 1].content}
                </ReactMarkdown>
              </div>
            ) : (
              <div className="gptDiv" key={"typing"}>
                <ReactMarkdown
                  rehypePlugins={[rehypeHighlight]}
                  className="gptMessage"
                >
                  {latestReply}
                </ReactMarkdown>
              </div>
            )}
          </>
        )}
{/* ------------ternary version above--------- */}
        {/* //printing latest reply delete hti later when you get api */}
        {/* {prevChats.length > 0 && latestReply != null && (
          <div className="gptDiv" key={"typing"}>
            <ReactMarkdown
              rehypePlugins={[rehypeHighlight]}
              className="gptMessage"
            >
              {latestReply}
            </ReactMarkdown>
          </div>
        )} */}
        {/* we would need to maek this new one because of the typing effect that we created */}
        {/* {prevChats.length > 0 && latestReply === null && (
          <div className="gptDiv" key={"non-typing"}>
            <ReactMarkdown
              rehypePlugins={[rehypeHighlight]}
              className="gptMessage"
            >
              {prevChats[prevChats.length - 1].content}
            </ReactMarkdown>
          </div>
        )} */}

      {/* ---------------------ternary version above--------- */}
        {/* //static messages for testing */}
        <div className="userDiv">
          <p className="userMessage">User Message</p>
        </div>
        <div className="gptDiv">
          <p className="gptMessage">GPT generated message</p>
        </div>
      </div>
    </>
  );
};

export default Chat;
