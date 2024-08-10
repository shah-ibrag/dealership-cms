import React from "react";
import { createRoot } from 'react-dom/client';
import {BrowserRouter, Route, Routes } from "react-router-dom";

import './index.css';


import Cars from "./Listings";
import Car from "./Listing";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Cars />} />
        <Route path="/id/:id" element={<Car />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
