import "./Chat.css";
import React, { useContext, useState, useEffect } from "react";
import { MyContext } from "./MyContext";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";

const SUGGESTIONS = [
    { icon: "fa-lightbulb", title: "Explain a concept", text: "Explain quantum computing in simple terms" },
    { icon: "fa-code", title: "Write some code", text: "Write a Python function to reverse a linked list" },
    { icon: "fa-feather", title: "Draft something", text: "Draft a friendly out-of-office email" },
    { icon: "fa-wand-magic-sparkles", title: "Brainstorm ideas", text: "Give me 5 creative names for a coffee brand" },
];

function Chat() {
    const {newChat, prevChats, reply, setPrompt} = useContext(MyContext);
    const [latestReply, setLatestReply] = useState(null);

    useEffect(() => {
        if(reply === null) {
            setLatestReply(null); //prevchat load
            return;
        }

        if(!prevChats?.length) return;

        const content = reply.split(" "); //individual words

        let idx = 0;
        const interval = setInterval(() => {
            setLatestReply(content.slice(0, idx+1).join(" "));

            idx++;
            if(idx >= content.length) clearInterval(interval);
        }, 40);

        return () => clearInterval(interval);

    }, [prevChats, reply])

    return (
        <div className="chatScroll">
            {newChat && (
                <div className="hero">
                    <div className="heroLogo" aria-hidden="true">
                        <i className="fa-solid fa-bolt"></i>
                    </div>
                    <h1 className="heroTitle">How can I help you today?</h1>
                    <p className="heroSub">Ask anything, or start with one of these.</p>
                    <div className="suggestions">
                        {SUGGESTIONS.map((s, i) => (
                            <button className="suggestionCard" key={i} onClick={() => setPrompt(s.text)}>
                                <i className={`fa-solid ${s.icon}`}></i>
                                <span className="sTitle">{s.title}</span>
                                <span className="sText">{s.text}</span>
                            </button>
                        ))}
                    </div>
                </div>
            )}
            <div className="chats">
                {
                    prevChats?.slice(0, -1).map((chat, idx) =>
                        <div className={chat.role === "user"? "userDiv" : "gptDiv"} key={idx}>
                            {
                                chat.role === "user"?
                                <p className="userMessage">{chat.content}</p> :
                                <div className="assistantBubble">
                                    <span className="botAvatar"><i className="fa-solid fa-bolt"></i></span>
                                    <ReactMarkdown rehypePlugins={[rehypeHighlight]}>{chat.content}</ReactMarkdown>
                                </div>
                            }
                        </div>
                    )
                }

                {
                    prevChats.length > 0  && (
                        <>
                            {
                                latestReply === null ? (
                                    <div className="gptDiv" key={"non-typing"} >
                                        <div className="assistantBubble">
                                            <span className="botAvatar"><i className="fa-solid fa-bolt"></i></span>
                                            <ReactMarkdown rehypePlugins={[rehypeHighlight]}>{prevChats[prevChats.length-1].content}</ReactMarkdown>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="gptDiv" key={"typing"} >
                                        <div className="assistantBubble">
                                            <span className="botAvatar"><i className="fa-solid fa-bolt"></i></span>
                                            <ReactMarkdown rehypePlugins={[rehypeHighlight]}>{latestReply}</ReactMarkdown>
                                        </div>
                                    </div>
                                )

                            }
                        </>
                    )
                }

            </div>
        </div>
    )
}

export default Chat;