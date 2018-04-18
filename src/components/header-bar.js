import React from 'react';
import { connect } from 'react-redux';
import { clearAuth } from '../actions/auth';
import { clearAuthToken } from '../local-storage';
import { Link } from 'react-router-dom';

import './header-bar.css';
import dashboard from './dashboard';

export class HeaderBar extends React.Component {
  logOut() {
    this.props.dispatch(clearAuth());
    clearAuthToken();
  }

  render() {
    // Only render the log out button if we are logged in
    let logOutButton;
    if (this.props.loggedIn) {
      logOutButton = <button onClick={() => this.logOut()}>Log out</button>;
    }
    return (
      <nav className="nav-bar">
        <ul className="nav">
          <li><Link to="/home" className="nav-item">Home
              </Link>
          </li>
          <li>{this.props.loggedIn ? <Link to="/dashboard" className="nav-item">Learn
              </Link>: null}
          </li>
          <li><a className="nav-item nav-button" > {logOutButton} </a> </li>
        </ul>
      </nav>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(HeaderBar);
