import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { getchatbyroomID, postmsg, startchart } from '../services/chatAPI';
import ScrollableFeed from 'react-scrollable-feed'
import io from 'socket.io-client';
//http://localhost:3200
//https://gosolo-api.onrender.com/
const socket = io('http://localhost:3200');

function ChatWindow() {
  const location = useLocation();
  const [chatstart, setchatstart] = useState({
    userIds: [],
    type: "chat",
    postID: ''
  });
  const [chatRoomId, setchatRoomId] = useState(null);
  const [User, setUser] = useState();
  const [Other, setOther] = useState();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
  ]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (message.trim()) {
      const res = await postmsg(chatRoomId, message)
      if (res) {
        const messageData = {
          message: { messageText: message },
          postedByUser: User._id,
          room: chatRoomId
        };

        socket.emit("send_message", messageData);
        setMessages((list) => [...list, messageData]);
        setMessage('')
      }
    }
  };
  const joinRoom = (chatRoomId) => {
    if (chatRoomId) {
      socket.emit("join_room", chatRoomId);
    }
  };

  async function fetchchat() {
    const ids = location.state.ids
    chatstart.postID = location.state.postID
    if (chatstart.userIds.length < 2) {
      ids.forEach(q => {
        setchatstart((prev) => ({
          ...prev,
          userIds: [...prev.userIds, q]
        }))
      });
    }
  }
  async function fetchchatroom(chatstart) {
    if (chatstart.userIds.length === 2) {
      const res = await startchart(chatstart)
      if (res) {
        console.log(res)
        setchatRoomId(res.chatRoom.chatRoomId)
        fetchroom()
      }
    }
  }
  async function fetchroom() {
    if (chatstart.userIds.length === 2) {
      const chat = await startchart(chatstart)
      if (chat) {
        setchatRoomId(chat.chatRoom.chatRoomId)
      }
      const res = await getchatbyroomID(chat.chatRoom.chatRoomId)
      if (res) {
        const o = location.state.other
        const u = location.state.me
        chat.chatRoom.userIds.forEach(q => {
          if (o === q._id) {
            setOther(q)
          }
        });
        chat.chatRoom.userIds.forEach(q => {
          if (u === q._id) {
            setUser(q)
          }
        });
        console.log(res.conversation)
        setMessages(res.conversation)
      }

    }
  }
  async function getmessages(roomid) {
    const res = await getchatbyroomID(roomid)
    setMessages(res.conversation)
  }
  useEffect(() => {
    fetchchat()
  }, [])
  useEffect(() => {
    if (chatstart && chatstart.userIds.length && chatstart.userIds.length === 2) {
      fetchchatroom(chatstart)
      fetchroom()
    }
  }, [chatstart])
  useEffect(() => {
  }, [User])
  useEffect(() => {
  }, [Other])
  useEffect(() => {
  }, [messages])
  useEffect(() => {
    if (chatRoomId !== null) {
      joinRoom(chatRoomId)
    }
  }, [chatRoomId])
  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessages((list) => [...list, data]);
    });
  }, [socket]);


  return (

    <div className="h-screen flex flex-col">
      <div className='bg-inherit  flex justify-center text-2xl text-black font-semibold mt-4 leading-9 capitalize'>
        {Other && (
          <h1>{Other.fullname}</h1>
        )}
      </div>
      <ScrollableFeed className="flex-1 overflow-y-scroll border-blue-300  opacity-95 bg-[#9494fc] sm:mx-40 md:mt-4 mb-6 sm:px-4 shadow-2xl py-2 rounded-2xl ">
        <div className="w-full">

          {User && Other && messages.map((msg, idx) => (
            <div className={`${msg.postedByUser === User._id ? 'flex justify-end' : 'flex justify-start'
              }`}>
              <div
                key={idx}
                className={`rounded-2xl p-4 shadow-xl mt-2 ${msg.postedByUser === User._id ? 'bg-gray-200 w-auto flex justify-end  text-white text-right' : 'bg-gray-100 w-auto'
                  }`}
              >
                <div className="">
                  <div className="">
                    <div className=" text-lg font-medium">
                      <div className={`${msg.postedByUser === User._id ? 'text-right' : 'text-left'}`}>
                        <p className="text-gray-700">{msg.message.messageText}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollableFeed>
      <div className="flex-none md:mx-40">
        <form className="flex items-center p-4" onSubmit={handleSendMessage}>
          <input
            className="flex-1 shadow-2xl appearance-none rounded py-2 px-4 mr-4 outline-none bg-gray-200 border-slate-200 text-lg font-medium"
            type="text"
            placeholder="Type your message here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            className="rounded-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white"
            type="submit"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default ChatWindow;
