import React from 'react'

import skyrimLogo from './images/logo.png';

import './infohome.css'
const InfoHome = () => {
  return (
    <div className="info-container" role="main">
      <h1>Ever wondered how dragons communicate with each other?</h1>
      <img className="skyrim-logo home" src={skyrimLogo} alt="logo"/>
      <p className="app-description">Now you can learn Dovah-Zul, the language of these magnificent beasts. This
        application uses a spaced reptition algorithm to ensure that you are learning
        the words that you struggle with the most. Your job is simple, we will provide
        you with the English translation and the word in Dragon Script and you need to
        provide the word in Dragon Language. Don't worry if you get it wrong, you will
        have plenty of chances to try again.</p>
      <div className="info-progression">
        <div className="f-pg">
          <i className="fa fa-book fa-5x"></i>
          <p>Discover</p>
        </div>

        <div className="f-pg">
          <i className="fa fa-braille fa-5x"></i>
          <p>Learn</p>
        </div>

        <div className="f-pg">
          <i className="fa fa-hourglass fa-5x"></i>
          <p>Memorize</p>
        </div>
        
      </div>
    </div>
  );
}

export default InfoHome