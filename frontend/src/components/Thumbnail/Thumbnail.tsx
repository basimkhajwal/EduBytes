import "bulma/css/bulma.min.css";
import "./Thumbnail.css";

const Thumbnail = () => {
  return (
    <>
      <div className="container video">
        <div>
          <div className="card-image">
            <figure>
              <img src="https://i.ytimg.com/vi/N6aGaDbZRU8/hqdefault.jpg?sqp=-oaymwEjCOADEI4CSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLAMN66WP6o4mbuTuK3X4ly5uK8-hg"></img>
            </figure>
          </div>
          <div className="is-overlay">
            {/* Hardcoded to get thumbnail length to bottom, dodgy af */}
            <div className="thumbnail-length is-pulled-right">
              <span className="tag is-dark">10:05</span>
            </div>
          </div>
        </div>
        <div className="has-text-weight-bold">
          Stochastic gradient Hamiltonian Monte Carlo
        </div>
        <div className="is-size-7">Khan Academy</div>
        <div className="is-size-7">
          6k views • 210 said helpful • 3 comments
        </div>
        <div className="tags pt-2">
          <span className="tag is-link is-light">statistics</span>
          <span className="tag is-link is-light">sampling</span>
          <span className="tag is-link is-light">langevin dynamics</span>
        </div>
      </div>
    </>
  );
};

export default Thumbnail;
