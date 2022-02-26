import "bulma/css/bulma.min.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignIn, faCoffee } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  return (
    <nav
      className="navbar has-shadow"
      role="navigation"
      aria-label="main navigation"
      style={{ paddingRight: "10px", paddingLeft: "10px" }}
    >
      <div className="navbar-brand">
        <a className="navbar-item">
          <div>
            <strong>EduBytes</strong>
          </div>
        </a>

        <a
          role="button"
          className="navbar-burger"
          aria-label="menu"
          aria-expanded="false"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
      <div className="navbar-end" id="nav-links">
        <div className="navbar-start">
          <a className="navbar-item has-text-weight-semibold">
            <span className="icon-text">
              <span className="icon">
                <FontAwesomeIcon icon={faSignIn} />
              </span>
              <span>Login</span>
            </span>
          </a>
          <a className="navbar-item has-text-weight-semibold">
            <span className="icon-text">
              <span className="icon">
                <FontAwesomeIcon icon={faCoffee} />
              </span>
              <span>Sign Up</span>
            </span>
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
