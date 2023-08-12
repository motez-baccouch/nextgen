import React from 'react';
import './LandingPage.scss';
import MainContent from './MainContent';

import { Container } from 'react-bootstrap';

const LandingPage: React.FC = () => {
  return (
    <div className="landing">
      
      <MainContent />
      
    </div>
  );
}

export default LandingPage;
