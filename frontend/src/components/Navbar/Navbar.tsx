import "bulma/css/bulma.min.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignIn, faCoffee } from "@fortawesome/free-solid-svg-icons";

interface Props {
  backHome: () => void;
}

const Navbar = (props: Props) => {
  return (
    <nav
      className="navbar has-shadow"
      role="navigation"
      aria-label="main navigation"
      style={{ paddingRight: "10px", paddingLeft: "10px" }}
    >
      <div className="navbar-brand">
        <a className="navbar-item">
          <div className="is-size-4">
            <a onClick={props.backHome}>
              <strong>EduBytes</strong>
            </a>
          </div>
        </a>
      </div>
      <div className="navbar-end" id="nav-links">
        <a className="navbar-item">
          <a href="https://oxfordhack22.co.uk">
            <div>
              <strong>@ Oxford Hack 2022</strong>
            </div>
          </a>
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
