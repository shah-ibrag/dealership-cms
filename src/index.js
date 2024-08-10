import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Cars from './Listings'
import Car from './Listing'

ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/" element={<Cars />} />
      <Route path="/id/?id" element={<Car />} />
    </Routes>
  </Router>,
  document.getElementById('root')
);