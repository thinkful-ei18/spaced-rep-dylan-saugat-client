 import React from 'react'
import './infohome.css'
 const InfoHome = () => {
  return(
    <div className="info-container"> 
    <h1>Every wondered how dragons communicate with each other?</h1>
    <p>Now you can learn Dovah-Zul, the language of these magnificent beasts.</p>
    <div className="info-progression">
    <div className="f-pg">
    <i class="fa fa-book fa-5x"></i>
    <p>Discover</p>
    </div>
   
    <div className="f-pg">
    <i class="fa fa-braille fa-5x">
    </i>
    <p>Learn</p>
    </div>

    <div className="f-pg">
    <i class="fa fa-hourglass fa-5x">
    </i>
    <p>Memorize</p>
    </div>
    </div>
    </div>
  );
}

export default InfoHome