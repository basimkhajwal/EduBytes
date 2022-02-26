import Navbar from "./components/Navbar/Navbar";
import "./App.css";

const App = () => {
  return (
    <>
      <div>
        <Navbar />
      </div>
      <div className="container landing-comp">
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
      </div>
    </>
  );
};

export default App;
