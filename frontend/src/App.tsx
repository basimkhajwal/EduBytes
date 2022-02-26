import Navbar from "./components/Navbar/Navbar";
import "./App.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVideo } from "@fortawesome/free-solid-svg-icons";

const App = () => {
  return (
    <>
      <div>
        <Navbar />
      </div>
      <section className="container landing-comp">
        <div className="is-size-1">
          <h1 className="has-text-weight-bold">What do you want to learn?</h1>
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
      <section className="container">
        <span
          className="icon"
          style={{
            display: "inline-block",
            paddingRight: "20px;",
          }}
        >
          <FontAwesomeIcon icon={faVideo} />
        </span>
        <span className="icon-text has-text-weight-bold">Popular videos</span>
      </section>
    </>
  );
};

export default App;
