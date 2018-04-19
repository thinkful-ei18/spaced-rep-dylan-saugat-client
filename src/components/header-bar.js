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
    let logOutButton = null;
    if (this.props.loggedIn) {
      logOutButton = <span onClick={() => this.logOut()} ><a className="logout-btn">Log out </a></span>;
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
          <li>
            {this.props.loggedIn ? null:<Link to="/" className="nav-item">Get Started</Link>
               }
            </li>
          <li><a className="nav-item nav-button" style={this.props.loggedIn ? {display:"inline-block"} : {display:"none"}} > {logOutButton} </a> </li>
        </ul>
      </nav>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(HeaderBar);
