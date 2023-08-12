import React , { useState } from 'react';
import './Header.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './assets/nextgenLogoWhite.png'

const Header: React.FC = () => {

  const [showSubHome, setShowSubHome] = useState(false);
  const [trapezoidMarginTop, setTrapezoidMarginTop] = useState('-53px');

 
  const handleSubNavBtnMouseOver = () => {
    setShowSubHome(false);
  };

  const handleTrapezoidMouseLeave = () => {
    setTrapezoidMarginTop('-53px');
    
  };

  const handleTrapezoidMouseEnter = () => {
    setTrapezoidMarginTop('-10px');
   
  };


  return (
    <div className="header">
      <nav className="navbar">
  <div id="trapezoid" onMouseLeave={handleTrapezoidMouseLeave} onMouseEnter={handleTrapezoidMouseEnter} style={{ marginTop: trapezoidMarginTop }}>
  
  <div className="subnav">
     <button className="subnavbtn" onMouseOver={handleSubNavBtnMouseOver}>About<i className="fa fa-caret-down"></i></button>
       <div className="subnav-content">
        <div className="subnav-trapezoid">
          <a href="/">Home</a>
         </div>
       </div>
      </div>
      
     <div className="subnav">
     <button className="subnavbtn" onMouseOver={handleSubNavBtnMouseOver}>Clients<i className="fa fa-caret-down"></i></button>
       <div className="subnav-content">
        <div id="subnav-trapezoid">
          <a href="#Clients">students</a>
          <a href="#Clients">organizations</a>
          <a href="#Clients">...</a>
        </div>
       </div>
    </div>

    <div className="subnav">
    <img src={logo} />
      
       
    </div>
 
  
     <div className="subnav">
     <button className="subnavbtn" onMouseOver={handleSubNavBtnMouseOver}>Services<i className="fa fa-caret-down"></i></button>
       <div className="subnav-content">
        <div className="subnav-trapezoid">
          <a href="#Services">web dev</a>
          <a href="#Services">AI</a>
          <a href="#Services">Mobile App Development</a>
         </div>
       </div>
      </div>
    
      <div className="subnav">
     <button className="subnavbtn" onMouseOver={handleSubNavBtnMouseOver}>Contact<i className="fa fa-caret-down"></i></button>
       <div className="subnav-content">
        <div className="subnav-trapezoid">
          <a href="#Services">Facebook</a>
          <a href="#Services">Instagram</a>
          <a href="#Services">Telegram</a>
         </div>
       </div>
      </div>
  </div>
</nav>

    </div>
  );
}

export default Header;
