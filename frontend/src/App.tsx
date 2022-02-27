import React from "react";
import MainView from "./views/MainView";
import ResultsView from "./views/ResultsView";
import VideoView from "./views/VideoView";

import Video from "./models/Video";

import "./App.css";

import { Route, Routes, Navigate, useNavigate } from "react-router-dom";

const App = () => {
  const navigate = useNavigate();

  const onSearch = (query: string) => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
    const encoded = encodeURI(query);
    navigate("/results/" + encoded);
  };

  const backHome = () => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
    navigate("/home");
  };

  const onVideoSelect = (video: Video) => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
    navigate("/video/" + video.id);
  };

  return (
    <Routes>
      <Route
        path="/home"
        element={
          <MainView
            onSearch={onSearch}
            backHome={backHome}
            onVideoSelect={onVideoSelect}
          />
        }
      />
      <Route
        path="/results/:query"
        element={
          <ResultsView
            onSearch={onSearch}
            backHome={backHome}
            onVideoSelect={onVideoSelect}
          />
        }
      />
      <Route
        path="/video/:id"
        element={
          <VideoView
            onSearch={onSearch}
            backHome={backHome}
            onVideoSelect={onVideoSelect}
          />
        }
      />
      <Route path="*" element={<Navigate to="/home" />} />
    </Routes>
  );
};

export default App;
