import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import LandingPage from './LandingPage';
import BigProject from './Components/BigProject';
import FiveExercises from './Components/FiveExercises';





const App: React.FC = () => {
  
  return (
    <Router>
      <Header />
      <Routes>
      <Route path="/" element={<LandingPage/>}  />
      <Route path="/bigproject" element={<BigProject/>}  />
      <Route path="/five" element={<FiveExercises/>}  />

      
      
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
