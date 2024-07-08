import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Form from "./Form";
import './Main.css' 


const Main = () => {
  return (
    <main>
      <h1>¡Lista de tareas!</h1>

      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/*" element={<Navigate to={"/"} />} />
      </Routes>

   </main>
  );
};

export default Main;
