import Navbar from "../components/Navbar/Navbar";
import React from "react";

import Thumbnail from "../components/Thumbnail/Thumbnail";
import SearchControl from "../components/SearchControl/SearchControl";
import Video from "../models/Video";
import "./MainView.css";

import videos from "../data/videos.json";
import { useParams } from "react-router-dom";

interface Props {
  onSearch: (query: string) => void;
  backHome: () => void;
  onVideoSelect: (video: Video) => void;
}

const ResultsView = (props: Props) => {
  const params = useParams();
  const query = decodeURI(params.query ?? "");

  const searchReturnText = "🔎  ‎  ‎Based on your search query: " + query;

  const keyWords = query.toLowerCase().split(" ");
  function videoScore(video: Video) {
    return keyWords.filter(
      (word) => video.snippet.description.toLowerCase().indexOf(word) !== -1
    ).length;
  }
  videos.sort((a, b) => videoScore(b) - videoScore(a));

  return (
    <>
      <div>
        <Navbar backHome={props.backHome} />
      </div>
      <section className="hero is-warning landing-comp">
        <div className="hero-body">
          <SearchControl onSearch={props.onSearch} existingQuery={query} />
        </div>
      </section>

      <section className="container p-6">
        {/* <span
          className="icon"
          style={{
            display: "inline-block",
            paddingRight: "20px;",
          }}
        >
          <FontAwesomeIcon icon={faVideo} />
        </span> */}
        <span className="icon-text pb-5">
          <h1 className="is-size-6 has-text-weight-bold">{searchReturnText}</h1>
        </span>
        <div className="columns is-multiline">
          {videos.slice(0, 100).map((v, i) => (
            <Thumbnail
              video={v}
              key={i.toString(10)}
              onSearch={props.onSearch}
              onVideoSelect={props.onVideoSelect}
              backHome={props.backHome}
            />
          ))}
        </div>
      </section>
    </>
  );
};

export default ResultsView;
