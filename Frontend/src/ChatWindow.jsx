import "./ChatWindow.css";
import Chat from "./Chat.jsx";
import { MyContext } from "./MyContext.jsx";
import { useContext, useState, useEffect } from "react";
import {ScaleLoader} from "react-spinners";

function ChatWindow() {
    const {prompt, setPrompt, reply, setReply, currThreadId, setPrevChats, setNewChat} = useContext(MyContext);
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const getReply = async () => {
        setLoading(true);
        setNewChat(false);

        console.log("message ", prompt, " threadId ", currThreadId);
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: prompt,
                threadId: currThreadId
            })
        };

        try {
            const response = await fetch("http://localhost:8080/api/chat", options);
            const res = await response.json();
            console.log(res);
            setReply(res.reply);
        } catch(err) {
            console.log(err);
        }
        setLoading(false);
    }

    //Append new chat to prevChats
    useEffect(() => {
        if(prompt && reply) {
            setPrevChats(prevChats => (
                [...prevChats, {
                    role: "user",
                    content: prompt
                },{
                    role: "assistant",
                    content: reply
                }]
            ));
        }

        setPrompt("");
    }, [reply]);


    const handleProfileClick = () => {
        setIsOpen(!isOpen);
    }

    const canSend = prompt.trim().length > 0 && !loading;

    return (
        <div className="chatWindow">
            <div className="navbar">
                <span className="modelPill">
                    <span className="statusDot"></span>
                    SigmaGPT <span className="modelTag">4o-mini</span>
                    <i className="fa-solid fa-chevron-down"></i>
                </span>
                <div className="userIconDiv" onClick={handleProfileClick}>
                    <span className="userIcon"><i className="fa-solid fa-user"></i></span>
                </div>
            </div>
            {
                isOpen &&
                <div className="dropDown">
                    <div className="dropDownItem"><i className="fa-solid fa-gear"></i> Settings</div>
                    <div className="dropDownItem"><i className="fa-solid fa-cloud-arrow-up"></i> Upgrade plan</div>
                    <div className="dropDownItem"><i className="fa-solid fa-arrow-right-from-bracket"></i> Log out</div>
                </div>
            }

            <Chat></Chat>

            {loading && (
                <div className="thinking">
                    <ScaleLoader color="#a855f7" height={18} width={3} radius={4} margin={2} loading={loading} />
                    <span>SigmaGPT is thinking…</span>
                </div>
            )}

            <div className="chatInput">
                <div className="inputBox">
                    <i className="fa-solid fa-paperclip attachIcon"></i>
                    <input placeholder="Ask anything…"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && canSend ? getReply() : ''}
                    />
                    <button
                        id="submit"
                        className={canSend ? "active" : ""}
                        disabled={!canSend}
                        onClick={() => canSend && getReply()}
                        aria-label="Send message"
                    >
                        <i className="fa-solid fa-arrow-up"></i>
                    </button>
                </div>
                <p className="info">
                    SigmaGPT can make mistakes. Check important info.
                </p>
            </div>
        </div>
    )
}

export default ChatWindow;