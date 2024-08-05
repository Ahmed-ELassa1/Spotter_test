import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import TruckingList from "./pages/TruckingList/TruckingList";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" index={true} element={<TruckingList />} />
      </Routes>
      <ToastContainer
        limit={6}
        autoClose={3000}
        newestOnTop={true}
        closeOnClick
        pauseOnFocusLoss
        pauseOnHover
      />
    </div>
  );
}

export default App;
