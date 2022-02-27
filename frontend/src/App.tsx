import React from "react";
import MainView from "./views/MainView";
import ResultsView from "./views/ResultsView";
import VideoView from "./views/VideoView";

import Video from "./models/Video";

import "./App.css";

import videos from "./data/videos.json";

// type PageState = { type: "main" } | { type: "video"; video: Video };
type PageState = { type: "main" } | { type: "searched"; query: string } | { type: "video"; video: Video };

const App = () => {
  const [state, setState] = React.useState<PageState>({ type: "main" });

  const onSearch = (query: string) => {
    const keyWords = query.toLowerCase().split(" ");
    function videoScore(video: Video) {
      return keyWords.filter(
        (word) => video.snippet.description.toLowerCase().indexOf(word) !== -1
      ).length;
    }
    videos.sort((a, b) => videoScore(b) - videoScore(a));
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    })
    setState({ type: "searched", query: query });
  };

  const backHome = () => { setState({ type: "main" }); };

  const onVideoSelect = (video: Video) => {
    setState({ type: "video", video: video });
  };

  return state.type === "main" ? (
    <MainView onSearch={onSearch} backHome={backHome} onVideoSelect={onVideoSelect} />
  ) : (
    state.type === "searched" ? (
      <ResultsView query={state.query} onSearch={onSearch} videos={videos} backHome={backHome} onVideoSelect={onVideoSelect} />
    ) : (<VideoView video={state.video} backHome={backHome} />));
};

export default App;
