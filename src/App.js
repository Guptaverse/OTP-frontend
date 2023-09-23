import React from 'react'
import './App.css';
import Phone from './routes/Phone';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import Success from './routes/Success';
import Verify from './routes/Verify';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path='/' element={<Phone />} />
          <Route  path='/verify' element={<Verify />} />
          <Route  path='/success' element={<Success />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
