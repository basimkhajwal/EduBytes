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

  const onSearch = (query: String) => {
    const keyWords = query.toLowerCase().split(" ");
    function videoScore(video: Video) {
      return keyWords.filter(
        (word) => video.snippet.description.toLowerCase().indexOf(word) !== -1
      ).length;
    }
    videos.sort((a, b) => videoScore(b) - videoScore(a));
    setState({ type: "video", video: videos[0] });
  };

  return state.type === "main" ? (
    <MainView onSearch={onSearch} />
  ) : (
    <VideoView video={state.video} />
  );
};

export default App;
