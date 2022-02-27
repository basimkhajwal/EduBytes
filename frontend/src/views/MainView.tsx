import Navbar from "../components/Navbar/Navbar";
import Thumbnail from "../components/Thumbnail/Thumbnail";

import "./MainView.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVideo } from "@fortawesome/free-solid-svg-icons";
import React from "react";

import videos from "../data/videos.json";

// const videoInfos = [
//   {
//     videoThumbnailUrl:
//       "https://i.ytimg.com/vi/ZPBkHuwIefQ/hq720.jpg?sqp=-oaymwEXCNAFEJQDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLCQhcppofhzoeEM4xnLB6qdH-Rr3w",
//     videoTitle: "Hamiltonian Monte Carlo and other MCMC",
//     videoLength: "10:05",
//     channelName: "Luke Ong",
//     numViews: "6k",
//     numFoundHelpful: "210",
//     numComments: "3",
//     tags: ["statistics", "sampling", "langevin dynamics"],
//   },
//   {
//     videoThumbnailUrl:
//       "https://i.ytimg.com/vi/cxNq-hQwvn0/hq720.jpg?sqp=-oaymwEXCNAFEJQDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLCnsTPkC24wp9fhT4pPAHqPcnI3Zg",
//     videoTitle: "Galois Theory for Noobies",
//     videoLength: "43:54",
//     channelName: "Insights into Mathematics",
//     numViews: "166k",
//     numFoundHelpful: "130",
//     numComments: "20",
//     tags: ["galois theory", "number theory"],
//   },
//   {
//     videoThumbnailUrl:
//       "https://i.ytimg.com/vi/iDulhoQ2pro/hq720.jpg?sqp=-oaymwEXCNAFEJQDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLDW3eSTm2teygE9mlImyWqJ32nUjA",
//     videoTitle: "Attention is All You Need",
//     videoLength: "27:07",
//     channelName: "Yannic Kilcher",
//     numViews: "333k",
//     numFoundHelpful: "710",
//     numComments: "43",
//     tags: ["transformers", "machine learning", "deep learning"],
//   },
// ];

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
