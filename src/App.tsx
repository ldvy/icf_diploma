import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { LandingPage, PlayPage } from './pages';

import './assets/root.css';

const App = () => {
  return (
    <div className='App'>
      <Helmet>
        <title>Industrial Craft</title>
      </Helmet>
      <Router>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/play' element={<PlayPage />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
