import Navbar from "../components/Navbar/Navbar";
import React from "react";

import Thumbnail from "../components/Thumbnail/Thumbnail";
import Video from "../models/Video";
import "./MainView.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVideo } from "@fortawesome/free-solid-svg-icons";

interface Props {
  videos: Video[];
  onSearch: (query: String) => void;
}

const ResultsView = (props: Props) => {
  const [searchInput, setSearchInput] = React.useState("");

  const searchPlaceholderMessage = "Maybe try Machine Learning?";
  const searchReturnText = "🔎 Based on your search query";
  return (
    <>
      <div>
        <Navbar />
      </div>
      <section className="hero landing-comp">
        <div className="hero-body">
          <div className="field is-grouped search-box">
            <p className="control is-expanded">
              <input
                className="input"
                type="text"
                placeholder={searchPlaceholderMessage}
                value={searchInput}
                onChange={(event) => setSearchInput(event.target.value)}
                onKeyPress={(e) => {
                  e.key === "Enter" && props.onSearch(searchInput);
                }}
              />
            </p>
            <p className="control">
              <button
                className="button is-info"
                onClick={() => props.onSearch(searchInput)}
              >
                Search
              </button>
            </p>
          </div>
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
          {props.videos.slice(0, 100).map((v, i) => (
            <Thumbnail video={v} key={i.toString(10)} />
          ))}
        </div>
      </section>
    </>
  );
};

export default ResultsView;
