/* eslint jsx-a11y/accessible-emoji: 0 */

import React from "react";
import styled from "styled-components";
import Post from "./components/Post";
import wildspotGif from "./images/wildspot_1.gif";
import weatherGif from "./images/wildspot_weather.gif";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 20px;
`;

const Paragraph = styled.a`
  display: flex;
  flex-direction: row;
  textdecoration: none;
  margin: 0;
`;

const Icon = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 5px;
`;

const PostImg = styled.img`
  width: 400px
  max-width: 100%
  margin: 10px 0;
`;

export default () => (
  <Container>
    <h1>
      <span role="img" aria-label="icon">
        ⛺️{" "}
      </span>Wildspot About / Diary 📖
    </h1>
    <h2>Find your next sweet spot for setting up a tent</h2>
    <p>
      This project is brought to you by{" "}
      <a href="https://rwilinski.me" rel="noopener noreferrer" target="_blank">
        Rafal Wilinski
      </a>. Wildspot is 100% open source, you can check it's code 🤓
      <a
        href="https://github.com/RafalWilinski/wildspot"
        rel="noopener noreferrer"
        target="_blank"
      >
        here.
      </a>
    </p>
    <p>
      <Paragraph
        href="https://trello.com/b/Q7onKpPF/wildspotco-features"
        rel="noopener noreferrer"
        target="_blank"
      >
        <Icon src="https://getbadges.io/images/trello_trello-mark-blue.png" />{" "}
        Got an idea how to improve Wildspot? Suggest it on Trello!
      </Paragraph>
    </p>
    <p>
      <Paragraph
        href="https://github.com/RafalWilinski/wildspot"
        rel="noopener noreferrer"
        target="_blank"
      >
        <Icon src="https://assets-cdn.github.com/images/modules/logos_page/GitHub-Mark.png" />{" "}
        Caught a bug? If you could report it on Github, that would be great
      </Paragraph>
    </p>
    <p>
      <Paragraph
        href="https://spectrum.chat/wildspot-co"
        rel="noopener noreferrer"
        target="_blank"
      >
        <Icon src="https://pbs.twimg.com/profile_images/849808190883545088/7i_PsjME_400x400.jpg" />{" "}
        Wanna chat about Wildspot or adventures? Check out our community
      </Paragraph>
    </p>
    <Post title="Release 1.1 - Weather 🌦" date="12th July, 2018">
      <ul>
        <li>Added country flags 🇬🇧</li>
        <li>Added current weather in modal title 🌦</li>
        <li>Added button redirecting to OpenWeatherMap 🌅</li>
        <li>Fix /:id based links 🔧</li>
        <PostImg src={weatherGif} />
      </ul>
    </Post>
    <Post title="Release 1.0 🎉" date="10th July, 2018">
      <ul>
        <li>Mapbox based map 🗺</li>
        <li>Rendering places 📌</li>
        <li>Displaying place details 🤓</li>
        <li>Search Functionality 🕵️‍</li>
        <PostImg src={wildspotGif} />
      </ul>
    </Post>
  </Container>
);
