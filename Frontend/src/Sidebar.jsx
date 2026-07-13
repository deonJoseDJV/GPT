import "./Sidebar.css";
import { useContext, useEffect } from "react";
import { MyContext } from "./MyContext.jsx";
import {v1 as uuidv1} from "uuid";

function Sidebar() {
    const {allThreads, setAllThreads, currThreadId, setNewChat, setPrompt, setReply, setCurrThreadId, setPrevChats} = useContext(MyContext);

    const getAllThreads = async () => {
        try {
            const response = await fetch("http://localhost:8080/api/thread");
            const res = await response.json();
            const filteredData = res.map(thread => ({threadId: thread.threadId, title: thread.title}));
            //console.log(filteredData);
            setAllThreads(filteredData);
        } catch(err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getAllThreads();
    }, [currThreadId])


    const createNewChat = () => {
        setNewChat(true);
        setPrompt("");
        setReply(null);
        setCurrThreadId(uuidv1());
        setPrevChats([]);
    }

    const changeThread = async (newThreadId) => {
        setCurrThreadId(newThreadId);

        try {
            const response = await fetch(`http://localhost:8080/api/thread/${newThreadId}`);
            const res = await response.json();
            console.log(res);
            setPrevChats(res);
            setNewChat(false);
            setReply(null);
        } catch(err) {
            console.log(err);
        }
    }   

    const deleteThread = async (threadId) => {
        try {
            const response = await fetch(`http://localhost:8080/api/thread/${threadId}`, {method: "DELETE"});
            const res = await response.json();
            console.log(res);

            //updated threads re-render
            setAllThreads(prev => prev.filter(thread => thread.threadId !== threadId));

            if(threadId === currThreadId) {
                createNewChat();
            }

        } catch(err) {
            console.log(err);
        }
    }

    return (
        <section className="sidebar">
            <div className="brand">
                <span className="brandMark" aria-hidden="true">
                    <svg viewBox="0 0 32 32" width="20" height="20">
                        <defs>
                            <linearGradient id="sgLogo" x1="0" y1="0" x2="1" y2="1">
                                <stop offset="0" stopColor="#a855f7" />
                                <stop offset="0.5" stopColor="#8b5cf6" />
                                <stop offset="1" stopColor="#6366f1" />
                            </linearGradient>
                        </defs>
                        <path fill="url(#sgLogo)" d="M22 6H11a5 5 0 0 0 0 10h6l-9 4v-3H8a5 5 0 0 1 0-10h11l3-1z" opacity="0" />
                        <path fill="url(#sgLogo)" d="M23 8.5c0-1.4-1.5-2.4-3-2.4H12.5C8.9 6.1 6 8.9 6 12.4c0 2.8 1.9 5.2 4.5 6v3.6c0 .5.6.8 1 .5l4.4-3.4h1.6c3.6 0 6.5-2.8 6.5-6.3 0-1.4-.5-2.7-1.3-3.7.2-.2.3-.4.3-.6z" />
                    </svg>
                </span>
                <span className="brandName">Sigma<span>GPT</span></span>
            </div>

            <button className="newChatBtn" onClick={createNewChat}>
                <i className="fa-solid fa-pen-to-square"></i>
                <span>New chat</span>
                <kbd>⌘N</kbd>
            </button>

            <p className="historyLabel">Recent</p>
            <ul className="history">
                {
                    allThreads?.length ? allThreads.map((thread, idx) => (
                        <li key={idx}
                            onClick={(e) => changeThread(thread.threadId)}
                            className={thread.threadId === currThreadId ? "highlighted" : ""}
                        >
                            <i className="fa-regular fa-message threadIcon"></i>
                            <span className="threadTitle">{thread.title}</span>
                            <i className="fa-solid fa-trash"
                                onClick={(e) => {
                                    e.stopPropagation(); //stop event bubbling
                                    deleteThread(thread.threadId);
                                }}
                            ></i>
                        </li>
                    )) : (
                        <li className="emptyHistory">No conversations yet</li>
                    )
                }
            </ul>

            <div className="sign">
                <span className="userChip">
                    <span className="userAvatar"><i className="fa-solid fa-user"></i></span>
                    <span className="userMeta">
                        <span className="userName">Guest</span>
                        <span className="userPlan">Free plan</span>
                    </span>
                    <i className="fa-solid fa-ellipsis"></i>
                </span>
            </div>
        </section>
    )
}

export default Sidebar;