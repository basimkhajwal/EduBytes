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

const MainView = (props: Props) => {
  const [searchInput, setSearchInput] = React.useState("");
  console.log(videos.slice(0, 6));
  return (
    <>
      <div>
        <Navbar />
      </div>
      <section className="hero is-medium is-warning landing-comp">
        <div className="hero-body">
          <div className="is-size-1">
            <h1 className="has-text-weight-bold">
              What do you want to learn today?
            </h1>
          </div>
          <div className="field is-grouped search-box">
            <p className="control is-expanded">
              <input
                className="input"
                type="text"
                placeholder="Find the right video for you"
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
          <h1 className="is-size-6 has-text-weight-bold">
            Videos popular with students this month
          </h1>
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

export default MainView;
