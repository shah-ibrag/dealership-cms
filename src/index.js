import React from "react";
import { createRoot } from 'react-dom/client';
import {BrowserRouter, Route, Routes } from "react-router-dom";

import './styles/index.css';


import Cars from "./Listings";
import Car from "./Listing";
import CarForm from './CarForm';


const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Cars />} />
        <Route path="/id/:id" element={<Car />} />
        {/* <Route path="/carForm" element={<CarForm />} /> */}
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
