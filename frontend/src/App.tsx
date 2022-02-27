import React from "react";
import MainView from "./views/MainView";
import ResultsView from "./views/ResultsView";
import VideoView from "./views/VideoView";

import Video from "./models/Video";

import "./App.css";

import videos from "./data/videos.json";

type PageState = { type: "main" } | { type: "video"; video: Video };

const App = () => {
  const [state, setState] = React.useState<PageState>({ type: "main" });

  return state.type === "main" ? (
    <MainView
      onSearch={(query) => {
        console.log(query);
        setState({ type: "video", video: videos[0] });
      }}
    />
  ) : (
    <VideoView video={state.video} />
  );
};

export default App;
