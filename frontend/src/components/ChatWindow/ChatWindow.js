import React, { useEffect, useRef, useState } from "react";
import Button from "@mui/material/Button";
import { io } from "socket.io-client";
import TextField from "@mui/material/TextField";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SendIcon from "@mui/icons-material/Send";
import { getMyRooms } from "../../actions/chatActions";

const ChatWindow = ({ socket, user, room }) => {
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const [chat, setchat] = useState([]);
  const [typing, setTyping] = useState(false);
  const [typingTimeout, setTypingTimeout] = useState(null);
  const [filest, setFile] = useState();
  const { roomId } = useParams();

  console.log(chat);

  const fileSelected = (e) => {
    const file = e.target.files[0];
    
    setFile(file);
    // if (!file) return;

    // const reader = new FileReader();
    // reader.readAsDataURL(file);
    // reader.onload = () => {
    //   const data = reader.result;
    //   socket.emit("upload", { data, room });
    // };
  };
  useEffect(() => {
    if (!socket) return;
    socket.on("message-from-server", (data) => {
      setchat((prev) => [...prev, { messages: data.message, received: true, type: 'lgy' }]);
    });

    socket.on("typing-started-from-server", () => {
      console.log(34);
      setTyping(true);
    });

    socket.on("typing-stoped-from-server", () => {
      setTyping(false);
    });

    socket.on("uploaded", (data) => {
      setchat((prev) => [ ...prev, { messages: data.buffer, received: false, type: "image" },]);
    });
  }, [socket]);

  const handleFrom = (e) => {
    e.preventDefault();
    console.log(3434344);
    socket.emit("send-message", { message, room, user });
    if (message !== '') {
      setchat((prev) => [...prev, { messages: message, received: false, type: 'dfg' }]);
    setMessage("");
    }
    

    if (!filest) return;

    const reader = new FileReader();
    reader.readAsDataURL(filest);
    reader.onload = () => {
      const data = reader.result;
      socket.emit("upload", { data, room });
      setchat((prev) => [...prev, { messages: data, received: false, type: 'image' }]);
    setFile("");
    };

  };

  const handleInput = (e) => {
    setMessage(e.target.value);
    socket.emit("typing-started", { room });

    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    setTypingTimeout(
      setTimeout(() => {
        socket.emit("typing-stoped", { room });
      }, 1000)
    );
  };

  return (
    <div>
      {roomId && <h2>ROOM : {roomId}</h2>}
      <div
        className="chat-box"
        style={{ display: "flex", flexDirection: "column" }}
      >
        {chat.map((el) => {
          return (
            <div
              className="blk mt-2"
              style={
                el.received
                  ? { textAlign: "left", color: "white" }
                  : { textAlign: "right" }
              }
            >
              {el.type === "image" ? (
                <img  style={{width:'100%', height: '50px'}} src={el.messages} alt="" />
              ) : (
                <p
                  style={
                    !el.received
                      ? { textAlign: "right", backgroundColor: "white" }
                      : {
                          textAlign: "left",
                          backgroundColor: "#3ccf4d",
                          color: "white",
                        }
                  }
                  className={el.user === "employee" ? "al-left" : "al-right"}
                >
                  {el.messages}
                </p>
              )}
            </div>
          );
        })}

        <div>
          {typing && (
            <div className="chat-bubble">
              <div className="typing">
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
              </div>
            </div>
          )}

          <form onSubmit={handleFrom}>
            <TextField
              id="standard-basic"
              className="sdf"
              variant="standard"
              placeholder="Send message"
              value={message}
              onChange={handleInput}
            />
            <Button>
              <input type="file" onChange={fileSelected} />{" "}
            </Button>
            <Button type="submit">
              <SendIcon />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;