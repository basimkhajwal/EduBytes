import React from "react";
import "./App.css";
import videos from "./data/videos.json";
import VideoView from "./components/VideoView";

const App = () => {
  return (
    <section className="hero">
      <div className="container">
        <h1 className="title">Hello World</h1>
        <p className="subtitle">
          My first website with <strong>Bulma</strong>!
        </p>
        <VideoView video={videos[0]} />
      </div>
    </section>
  );
};

export default App;
