import React, { useEffect, useState } from "react";
import "./styles.scss";

import Anonyme from "../../assets/img/anonyme.svg";

const UsersList = ({ socket }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const usersListener = (newUsers) => {
      setUsers(newUsers);
    };

    const userListener = (user) => {
      setUsers((prevUsers) => {
        return prevUsers.map((currentUser) => (currentUser.id === user.id ? user : currentUser));
      });
    };

    const onConnection = (user) => {
      setUsers((prevUsers) => [...prevUsers, user]);
    };

    const userDisconnection = (user) => {
      setUsers((prevUsers) => {
        return prevUsers.filter((currentUser) => currentUser.id !== user.id);
      });
    };

    // GET CONNECTION AND DECONNECTION UPDATES
    socket.on("userConnection", onConnection);
    socket.on("userDisconnection", userDisconnection);

    // GET USERS LIST
    socket.emit("getUsers");
    socket.on("users", usersListener);

    // GET NAME UPDATES
    socket.on("updateUsername", userListener);
    socket.on("updateAvatar", userListener);
  }, [socket]);

  return (
    <>
      <div className="user__list">
        <p data-descr={users.length} className="user__online">
          En ligne
        </p>
      </div>

      <div className="user__container">
        <div className="user__subContainer">
          {users
            .sort((a, b) => (a.hasOwnProperty("avatar") ? -1 : b.hasOwnProperty("avatar") ? 1 : 0))
            .map((user) => (
              <div className="user__infos" key={user.id}>
                <img className="user__avatar" src={user.avatar || Anonyme} alt="" />
                <p className="user__username">{user.name}</p>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default UsersList;
