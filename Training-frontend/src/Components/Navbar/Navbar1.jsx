import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import './Navbar.css';
import { FaGithub } from 'react-icons/fa';

class Navbar1 extends Component {
  render() {
    return (
      <nav class="navbar navbar-expand-md navbar-dark fixed-top">
        <div className="container">
          <Link class="navbar-brand border-none" to="/">
            Training Administration Portal
          </Link>
          <button
            class="navbar-toggler d-lg-none"
            type="button"
            data-toggle="collapse"
            data-target="#collapsibleNavId"
            aria-controls="collapsibleNavId"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="collapsibleNavId">
            
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar1;
