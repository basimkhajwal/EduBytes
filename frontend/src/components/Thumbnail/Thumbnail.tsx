import "bulma/css/bulma.min.css";
import "./Thumbnail.css";

const Thumbnail = () => {
  return (
    <>
      <div className="container video">
        <div className="thumbnail"></div>
        <div className="has-text-weight-bold">Hamiltonian Monte Carlo</div>
        <div>Khan Academy</div>
        <div className="tags" style={{ margin: "20px;" }}>
          <span className="tag is-rounded is-light">statistics</span>
          <span className="tag is-rounded is-light">sampling</span>
          <span className="tag is-rounded is-light">langevin dynamics</span>
        </div>
      </div>
    </>
  );
};

export default Thumbnail;
