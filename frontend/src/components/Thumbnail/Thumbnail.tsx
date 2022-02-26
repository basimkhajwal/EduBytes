import "bulma/css/bulma.min.css";
import "./Thumbnail.css";

const Thumbnail = () => {
  return (
    <>
      <div className="container video">
        <div className="thumbnail"></div>
        <div className="has-text-weight-bold">
          Stochastic gradient Hamiltonian Monte Carlo
        </div>
        <div>Khan Academy</div>
        <div className="tags container pt-2">
          <span className="tag is-rounded is-light">statistics</span>
          <span className="tag is-rounded is-light">sampling</span>
          <span className="tag is-rounded is-light">langevin dynamics</span>
          <span className="tag is-rounded is-light">mars bars</span>
        </div>
      </div>
    </>
  );
};

export default Thumbnail;
