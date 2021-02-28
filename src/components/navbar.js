import React from "react";
import { Link } from "react-router-dom";
import { isAuthenticated, signout } from "../connections/index";
export default function Navbar() {
  return (
    <div className={"nav-bar"}>
      <div className={"arthv-ed"}>
        <Link to="/">Arthv-ed</Link>
      </div>
      {!isAuthenticated().user && (
        <div className={"nav-login"}>
          <Link to="/login">Login</Link>
        </div>
      )}
      {isAuthenticated().user && (
        <div className={"nav-login"}>
          <Link
            to="/"
            onClick={() => {
              signout();
            }}
          >
            Logout
          </Link>
        </div>
      )}
    </div>
  );
}
