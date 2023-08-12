import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import LandingPage from './LandingPage';




const App: React.FC = () => {
  
  return (
    <Router>
      <Header />
      <Routes>
      <Route path="/" element={<LandingPage/>}  />
      
      
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
