import React, { Component } from "react";
//since we user React-Router import Link
//to allow to link to different routes
import { Link } from "react-router-dom";

export default class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        {/*Link to route with path='/' in App.js*/}
        <Link to="/" className="navbar-brand">
          ExcerTracker:
        </Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="navbar-item">
              {/*Link to route with path='/' in App.js*/}
              <Link to="/" className="nav-link">
                Execises
              </Link>
            </li>
            <li className="navbar-item">
              {/*Link to route with path='/create' in App.js*/}
              <Link to="/create" className="nav-link">
                Create Exercise
              </Link>
            </li>
            <li className="navbar-item">
              {/*Link to route with path='/user' in App.js*/}
              <Link to="/user" className="nav-link">
                Create User
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
