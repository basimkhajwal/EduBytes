import Navbar from "../components/Navbar/Navbar";
import Thumbnail from "../components/Thumbnail/Thumbnail";

import "./MainView.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVideo } from "@fortawesome/free-solid-svg-icons";

const MainView = () => {
  return (
    <>
      <div>
        <Navbar />
      </div>
      <section className="container landing-comp">
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
            />
          </p>
          <p className="control">
            <a className="button is-info">Search</a>
          </p>
        </div>
      </section>
      <section className="container pt-6 pb-6">
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
        <div className="columns is-centred">
          <Thumbnail
            videoInfo={{
              videoThumbnailUrl:
                "https://i.ytimg.com/vi/ZPBkHuwIefQ/hq720.jpg?sqp=-oaymwEXCNAFEJQDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLCQhcppofhzoeEM4xnLB6qdH-Rr3w",
              videoTitle: "Hamiltonian Monte Carlo and other MCMC",
              videoLength: "10:05",
              channelName: "Luke Ong",
              numViews: "6k",
              numFoundHelpful: "210",
              numComments: "3",
              tags: ["statistics", "sampling", "langevin dynamics"],
            }}
          />
          <Thumbnail
            videoInfo={{
              videoThumbnailUrl:
                "https://i.ytimg.com/vi/cxNq-hQwvn0/hq720.jpg?sqp=-oaymwEXCNAFEJQDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLCnsTPkC24wp9fhT4pPAHqPcnI3Zg",
              videoTitle: "Galois Theory for Noobies",
              videoLength: "43:54",
              channelName: "Insights into Mathematics",
              numViews: "166k",
              numFoundHelpful: "130",
              numComments: "20",
              tags: ["galois theory", "number theory"],
            }}
          />
          <Thumbnail
            videoInfo={{
              videoThumbnailUrl:
                "https://i.ytimg.com/vi/iDulhoQ2pro/hq720.jpg?sqp=-oaymwEXCNAFEJQDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLDW3eSTm2teygE9mlImyWqJ32nUjA",
              videoTitle: "Attention is All You Need",
              videoLength: "27:07",
              channelName: "Yannic Kilcher",
              numViews: "333k",
              numFoundHelpful: "710",
              numComments: "43",
              tags: ["transformers", "machine learning", "deep learning"],
            }}
          />
        </div>
      </section>
    </>
  );
};

export default MainView;
