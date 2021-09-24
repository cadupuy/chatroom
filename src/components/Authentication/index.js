import React, { useState, useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { gsap } from "gsap";

// IMAGES
import Avatar1 from "../../assets/img/avatar_1.png";
import Avatar2 from "../../assets/img/avatar_2.png";
import Avatar3 from "../../assets/img/avatar_3.png";
import Avatar4 from "../../assets/img/avatar_4.png";
import Avatar5 from "../../assets/img/avatar_5.png";
import Avatar6 from "../../assets/img/avatar_6.png";
import Avatar7 from "../../assets/img/avatar_7.png";
import Avatar8 from "../../assets/img/avatar_8.png";
import Avatar9 from "../../assets/img/avatar_9.svg";
import Avatar10 from "../../assets/img/avatar_10.svg";
import Avatar11 from "../../assets/img/avatar_11.svg";
import Avatar12 from "../../assets/img/avatar_12.svg";
import Avatar13 from "../../assets/img/avatar_13.svg";
import Avatar14 from "../../assets/img/avatar_14.svg";
import Avatar15 from "../../assets/img/avatar_15.svg";
import Avatar16 from "../../assets/img/avatar_16.svg";
import Avatar17 from "../../assets/img/avatar_17.svg";
import Avatar18 from "../../assets/img/avatar_18.svg";
import Avatar19 from "../../assets/img/avatar_19.svg";
import Avatar20 from "../../assets/img/avatar_20.svg";
import Avatar21 from "../../assets/img/avatar_21.svg";
import Avatar22 from "../../assets/img/avatar_22.svg";
import Avatar23 from "../../assets/img/avatar_23.svg";
import Avatar24 from "../../assets/img/avatar_24.svg";

// Button
import Shuffle from "../../assets/img/shuffle.svg";

// Waves
import WaveTopLeft from "../../assets/img/waveTopLeft.svg";
import WaveTopRight from "../../assets/img/waveTopRight.svg";
import WaveBottomRight from "../../assets/img/waveBottomRight.svg";
import WaveBottomLeft from "../../assets/img/waveBottomLeft.svg";

import "./styles.scss";

const Authentication = ({ socket }) => {
  const history = useHistory();

  const [username, setUsername] = useState(null);
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [avatar, setAvatar] = useState([]);

  const el = useRef();
  const test = useRef();

  const avatars = [
    Avatar1,
    Avatar2,
    Avatar3,
    Avatar4,
    Avatar5,
    Avatar6,
    Avatar7,
    Avatar8,
    Avatar9,
    Avatar10,
    Avatar11,
    Avatar12,
    Avatar13,
    Avatar14,
    Avatar15,
    Avatar16,
    Avatar17,
    Avatar18,
    Avatar19,
    Avatar20,
    Avatar21,
    Avatar22,
    Avatar23,
    Avatar24,
  ];

  useEffect(() => {
    shuffleAvatars();
    // gsap.fromTo(el.current, { y: -100 }, { y: 0 });
  }, []);

  const shuffleAvatars = () => {
    setSelectedAvatar(null);
    var randomAvatars = [];
    for (var i = 0; i < 8; i++) {
      let rand = "";

      do {
        rand = avatars[Math.floor(Math.random() * 24)];
      } while (randomAvatars.indexOf(rand) !== -1);

      randomAvatars.push(rand);
    }
    setAvatar(randomAvatars);
    gsap.fromTo(el.current, { scale: 0 }, { scale: 1, ease: "back", duration: 0.3 });
  };

  const handleUsername = (event) => {
    setUsername(event.target.value);
  };

  const handleForm = (e) => {
    e.preventDefault();

    socket.emit("setUsername", username);
    socket.emit("setAvatar", selectedAvatar);

    history.push("/chat");
    setUsername("");
  };

  return (
    <section className="connexion" ref={test}>
      <img className="connexion__wave--topLeft" src={WaveTopLeft} alt="" />
      <img className="connexion__wave--topRight" src={WaveTopRight} alt="" />
      <img className="connexion__wave--bottomRight" src={WaveBottomRight} alt="" />
      <img className="connexion__wave--bottomLeft" src={WaveBottomLeft} alt="" />

      <div className="connexion__container">
        <h1>Choisis ton personnage</h1>

        <div className="connexion__avatar" ref={el}>
          {avatar.map((avatar) => {
            return (
              <img
                onClick={() => {
                  setSelectedAvatar(avatar);
                }}
                className={selectedAvatar === avatar ? "selectedAvatar" : "avatar"}
                src={avatar}
                alt=""
              />
            );
          })}
        </div>

        <img className="connexion__shuffle" onClick={shuffleAvatars} src={Shuffle} alt="" />

        <form className="connexion__form" onSubmit={handleForm}>
          <label htmlFor="username">Username</label>
          <input
            className="connexion__input"
            required
            value={username}
            id="username"
            placeholder="ex: bgdu60"
            onChange={handleUsername}
          />

          <button className="connexion__button" type="submit">
            valider
          </button>
        </form>
      </div>
    </section>
  );
};

export default Authentication;
