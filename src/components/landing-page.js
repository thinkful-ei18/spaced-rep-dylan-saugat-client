import React from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
import './landing-page.css'
import LoginForm from './Login/Login-form';
import skyrimLogo from './images/logo.png'
export function LandingPage(props) {
    // If we are logged in redirect straight to the user's dashboard
    if (props.loggedIn) {
        return <Redirect to="/dashboard" />;
    }

    return (
        <div className="landing-page">
            <h2>Spaced Repition App</h2>
            <LoginForm />
            <Link to="/register">Register</Link>
            <div className="app-info"> <h5></h5>
            <img className="app-img" src={skyrimLogo} alt="logo"/> 
            <p className="app-overview"></p>
            </div>
           
            </div>
    );
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(LandingPage);
