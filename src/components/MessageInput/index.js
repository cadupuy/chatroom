import React, { useState } from "react";
import "./styles.scss";
import PlaneIcon from "../../assets/img/plane.svg";
import SurpriseIcon from "../../assets/img/surprise.svg";
import { motion } from "framer-motion";

const MessageInput = ({ socket, constraintsRef }) => {
  const [message, setMessage] = useState("");

  const submitForm = (e) => {
    e.preventDefault();

    if (message === "" || message === null || !message) {
      return;
    }
    socket.emit("message", message);
    setMessage("");
  };

  return (
    // <motion.div
    // drag

    <form drag className="message__form" onSubmit={submitForm}>
      <motion.input
        drag
        dragConstraints={constraintsRef}
        autoFocus
        required
        className="message__input"
        value={message}
        placeholder="vous pouvez écrire ici..."
        onChange={(e) => {
          setMessage(e.currentTarget.value);
        }}
      />

      <motion.img
        drag
        dragConstraints={constraintsRef}
        onClick={submitForm}
        className="message__input--icon"
        src={PlaneIcon}
        alt=""
      />

      <motion.img
        drag
        dragConstraints={constraintsRef}
        onClick={submitForm}
        className="message__input--icon"
        src={SurpriseIcon}
        alt=""
      />
    </form>
  );
};

export default MessageInput;
