import React from "react";

import Navbar from "../components/Navbar/Navbar";
import Thumbnail from "../components/Thumbnail/Thumbnail";
import SearchControl from "../components/SearchControl/SearchControl";

import "./MainView.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVideo } from "@fortawesome/free-solid-svg-icons";

import videos from "../data/videos.json";

import Video from "../models/Video";
import { sortVideos, watchedTags } from "../utilities/matching";

interface Props {
  onSearch: (query: string) => void;
  backHome: () => void;
  onVideoSelect: (video: Video) => void;
}

// const TOPICS = [
//   "Quantum Theory",
//   "Information Theory",
//   "Algorithms",
//   "Hypercube",
//   "Machine Learning",
//   "Euler's Theorem",
//   "Complex Numbers",
//   "Fractals",
// ];

// interface SearchProps {
//   onSearch: (query: string) => void;
// }

// const SearchControl = (props: SearchProps) => {
//   const randomTopic = TOPICS[Math.floor(Math.random() * TOPICS.length)];
//   const searchPlaceholderMessage = "How about " + randomTopic + "?";

//   const [searchInput, setSearchInput] = React.useState("");

//   function doSearch() {
//     props.onSearch(searchInput !== "" ? searchInput : randomTopic);
//   }

//   return (
//     <div className="field is-grouped search-box">
//       <p className="control is-expanded">
//         <input
//           className="input"
//           type="text"
//           placeholder={searchPlaceholderMessage}
//           defaultValue={searchInput}
//           onChange={(event) => setSearchInput(event.target.value)}
//           onKeyPress={(e) => {
//             if (e.key === "Enter") {
//               doSearch();
//             }
//           }}
//         />
//       </p>
//       <p className="control">
//         <button
//           type="submit"
//           className="button is-info"
//           onClick={() => doSearch()}
//         >
//           Search
//         </button>
//       </p>
//     </div>
//   );
// };

const MainView = (props: Props) => {
  const headerTitle = "What do you want to learn 🧠 today?";

  const keywords = watchedTags(videos as Video[]);
  const myVideos = sortVideos(videos as Video[], keywords);

  return (
    <>
      <div>
        <Navbar backHome={props.backHome} />
      </div>
      <section className="hero is-medium is-warning landing-comp">
        <div className="hero-body">
          <div className="is-size-1">
            <h1 className="has-text-weight-bold">{headerTitle}</h1>
          </div>
          <SearchControl onSearch={props.onSearch} />
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
            Videos recommended for you
          </h1>
        </span>
        <div className="columns is-full-mobile is-multiline">
          {myVideos.slice(0, 100).map((v, i) => (
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

export default MainView;
