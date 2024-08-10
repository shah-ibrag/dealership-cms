import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CarListings from './CarListings';
import ListingDetail from './ListingDetail';

ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/" element={<CarListings />} />
      
      <Route path="/id/?id" element={<ListingDetail />} />
    </Routes>
  </Router>,
  document.getElementById('root')
);