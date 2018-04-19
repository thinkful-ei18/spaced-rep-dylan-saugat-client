import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import './landing-page.css';
import LoginForm from './Login/Login-form';
import skyrimLogo from './images/logo.png';
import RegistrationForm from './Registration/registration-form';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import './react-tabs.css';
export function LandingPage(props) {
  // If we are logged in redirect straight to the user's dashboard
  if (props.loggedIn) {
    return <Redirect to="/dashboard" />;
  }

  return <div className="landing-page">
      <h2>Spaced Repition: Learn Dragon Language</h2>

      <Tabs>
        <TabList>
          <Tab>Register</Tab>
          <Tab>Log In</Tab>
        </TabList>

        <TabPanel>
          <h2 className="rg-head">Register</h2>
          <RegistrationForm />
        </TabPanel>
        <TabPanel>
          <h2 className="lg-head">Log In</h2>
          <LoginForm />
        </TabPanel>
      </Tabs>
      <div className="app-info">
        <img className="app-img" src={skyrimLogo} alt="logo" />
      </div>
    </div>;
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(LandingPage);
