 import React from 'react'

 import skyrimLogo from './images/logo.png';

import './infohome.css'
 const InfoHome = () => {
  return(
    <div className="info-container" role="main"> 
    <h1>Ever wondered how dragons communicate with each other?</h1>
    <p>Now you can learn Dovah-Zul, the language of these magnificent beasts.</p>
    <div className="info-progression">
    <div className="f-pg">
    <i className="fa fa-book fa-5x"></i>
    <p>Discover</p>
    </div>
   
    <div className="f-pg">
    <i className="fa fa-braille fa-5x">
    </i>
    <p>Learn</p>
    </div>

    <div className="f-pg">
    <i className="fa fa-hourglass fa-5x">
    </i>
    <p>Memorize</p>
    </div>
    <img className="skyrim-logo" src={skyrimLogo} alt="logo"/>
    </div>
    </div>
  );
}

export default InfoHome