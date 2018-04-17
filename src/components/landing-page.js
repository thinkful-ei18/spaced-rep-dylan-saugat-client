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
            <div className="app-info"> <h5>What is Dovahzul?</h5>
            <img className="app-img" src={skyrimLogo} alt="logo"/> 
            <p className="app-overview">Dovahzul is the native lanaguage used by the dragons of skyrim to communicate. This language was drive to the brink of extincition with only a limited number of existing Dragons using it for powerful magic. The main character in the game is also able to learn parts of the language due to him being a dragonborn. This powerful language allows the speaker to cast powerful shouts and inflict grave damage upon the enemy. You might even discover your secrent status of a dragonborn by learning the shouts. </p>
            </div>
           
            </div>
    );
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(LandingPage);
