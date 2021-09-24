import React, { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import Anonyme from "../../assets/img/anonyme.svg";
import { motion } from "framer-motion";

import "./styles.scss";

import MessageInput from "../MessageInput/index";

const Messages = ({ socket, constraintsRef }) => {
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);
  const messageElement = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    gsap.fromTo(messageElement.current, 0.4, { scale: 0 }, { scale: 1, ease: "back" });

    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const messagesListener = (messages) => {
      setMessages(messages);
    };

    const messageListener = (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    };

    // GET MESSAGES HISTORY
    socket.emit("getMessages");
    socket.on("messages", messagesListener);

    // GET NEW MESSAGES
    socket.on("message", messageListener);
  }, [socket]);

  return (
    <div className="message__container">
      {messages
        .sort((a, b) => a.time - b.time)
        .map((message) => {
          const currentUser = message.user.id === socket.id;
          return (
            <motion.div
              drag
              dragConstraints={constraintsRef}
              ref={messageElement}
              key={message.id}
              className={currentUser ? "message__owner" : "message__standard"}
              title={`Sent at ${new Date(message.time).toLocaleTimeString()}`}
            >
              {!currentUser && (
                <div className="message__userInfos">
                  <img className="message__avatar" src={message.user?.avatar || Anonyme} alt="" />
                  <p className="message__username">{message.user.name}</p>
                </div>
              )}

              <p className={currentUser ? "message__content--currentUser" : "message__content"}>{message.value}</p>
              <p className={currentUser ? "message__date--currentUser" : "message__date"}>
                {new Date(message.time).toLocaleTimeString()}
              </p>
            </motion.div>
          );
        })}

      <div ref={messagesEndRef} />

      <MessageInput socket={socket} constraintsRef={constraintsRef} />
    </div>
  );
};

export default Messages;
