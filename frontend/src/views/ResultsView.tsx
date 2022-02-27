import Navbar from "../components/Navbar/Navbar";
import React from "react";

import Thumbnail from "../components/Thumbnail/Thumbnail";
import SearchControl from "../components/SearchControl/SearchControl";
import Video from "../models/Video";
import "./MainView.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVideo } from "@fortawesome/free-solid-svg-icons";

interface Props {
  query: string;
  videos: Video[];
  onSearch: (query: string) => void;
  backHome: () => void;
  onVideoSelect: (video: Video) => void;
}

const ResultsView = (props: Props) => {
  const [searchInput, setSearchInput] = React.useState("");
  console.log(props.query, searchInput);
  if (props.query && props.query !== "" && props.query !== searchInput) { setSearchInput(props.query); }
  const searchPlaceholderMessage = "Maybe try Machine Learning?";
  const searchReturnText = "🔎 Based on your search query";
  return (
    <>
      <div>
        <Navbar backHome={props.backHome} />
      </div>
      <section className="hero is-warning landing-comp">
        <div className="hero-body">
          <SearchControl onSearch={props.onSearch} existingQuery={props.query} />
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
            <Thumbnail video={v} key={i.toString(10)} onSearch={props.onSearch} onVideoSelect={props.onVideoSelect} backHome={props.backHome} />
          ))}
        </div>
      </section>
    </>
  );
};

export default ResultsView;
