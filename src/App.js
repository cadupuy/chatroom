import React, { useEffect, useState, useRef } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import io from "socket.io-client";
import { motion, AnimatePresence } from "framer-motion";

// Components
import Messages from "./components/Messages";
import UsersList from "./components/UsersList";
import Authentication from "./components/Authentication";

import "./App.scss";

function App() {
  const [socket, setSocket] = useState(null);
  const constraintsRef = useRef(null);

  useEffect(() => {
    const newSocket = io("https://whispering-chamber-09886.herokuapp.com");
    setSocket(newSocket);
    return () => newSocket.close();
  }, [setSocket]);

  return socket ? (
    <Router>
      <Route path="/chat">
        <main className="chatroom" data-lg-page="my-second-page">
          <div className="user">
            <UsersList socket={socket} />
          </div>
          <div className="message" ref={constraintsRef}>
            <Messages socket={socket} constraintsRef={constraintsRef} />
          </div>
        </main>
      </Route>
      <Switch>
        <Route exact path="/">
          <Authentication socket={socket} />
        </Route>
      </Switch>
    </Router>
  ) : (
    <div>Not Connected</div>
  );
}

export default App;
