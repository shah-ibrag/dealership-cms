import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./styles/index.css";

import Cars from "./Listings";
import Car from "./Listing";
import CarForm from "./CarForm";
import Login from "./Login";
import Categories from "./Categories";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Cars />} />
        <Route path="/id/:id" element={<Car />} />
        <Route path="/carForm" element={<CarForm />} />
        <Route path="/login" element={<Login />} />
        <Route path="/categories" element={<Categories />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);