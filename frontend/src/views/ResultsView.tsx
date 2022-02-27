import Navbar from "../components/Navbar/Navbar";
import Thumbnail from "../components/Thumbnail/Thumbnail";

import "./MainView.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVideo } from "@fortawesome/free-solid-svg-icons";
import React from "react";

import videos from "../data/videos.json";

interface Props {
  onSearch: (query: String) => void;
}

const ResultsView = (props: Props) => {
  const [searchInput, setSearchInput] = React.useState("");
  console.log(videos.slice(0, 6));

  const searchPlaceholderMessage = "Maybe try Machine Learning?";
  const searchReturnText = "Your search text goes here";
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
        <span
          className="icon"
          style={{
            display: "inline-block",
            paddingRight: "20px;",
          }}
        >
          <FontAwesomeIcon icon={faVideo} />
        </span>
        <span className="icon-text pb-5">
          <h1 className="is-size-6 has-text-weight-bold">{searchReturnText}</h1>
        </span>
        <div className="columns is-multiline">
          {videos.slice(0, 100).map((v, i) => (
            <Thumbnail video={v} key={i.toString(10)} />
          ))}
        </div>
      </section>
    </>
  );
};

export default ResultsView;
