/* eslint-disable no-unused-vars */
// import { useState } from "react";
import Login from "./Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import AppRouter from "./routes/AppRouter";
// import MainLayout from "./MainLayout";


function App() {
  return (
    <div>
  <AppRouter/>
      
    </div>
  );
}

export default App;
