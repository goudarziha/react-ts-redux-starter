import * as React from "react";
import * as _ from "lodash";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../ducks/authDuck";
import Avatar from "./Avatar";

const Header = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(state =>
    _.get(state, ["auth", "isAuthenticated"])
  );

  const logoutUser = () => {
    dispatch(logout());
  };

  const guestLinks = (
    <ul className="navbar-nav ml-auto">
      <li className="nav-item">
        <Link to="/register" className="nav-link">
          Register
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/login" className="nav-link">
          Login
        </Link>
      </li>
    </ul>
  );

  const authLinks = (
    <ul className="navbar-nav ml-auto">
      <li className="nav-item dropdown">
        <div
          className="d-flex flex-row"
          data-toggle="dropdown"
          style={{ cursor: "pointer" }}
        >
          <span
            style={{ height: "100%", alignSelf: "center" }}
            className="mr-2"
          >
            name
          </span>
          <Avatar name="df" size={36} />
        </div>
        <div
          className="dropdown-menu dropdown-menu-right"
          aria-labelledby="navbarDropdownMenuLink"
        >
          <Link to="/profile" className="dropdown-item">
            Profile
          </Link>
          <Link to="/settings" className="dropdown-item">
            Settings
          </Link>

          <div className="dropdown-divider" />
          <span className="dropdown-item" onClick={() => logoutUser()}>
            logout
          </span>
        </div>
      </li>
    </ul>
  );

  return (
    <nav
      className="navbar navbar-expand-md sticky-top bg-light"
      data-testid="header-test"
    >
      <div className="container-fluid">
        <Link
          to="/"
          className="navbar-brand font-weight-bold text-monospace"
          style={{ color: "#34495e" }}
        >
          makr
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item">yes</li>
          </ul>
          {isAuthenticated ? authLinks : guestLinks}
        </div>
      </div>
    </nav>
  );
};

export default Header;
