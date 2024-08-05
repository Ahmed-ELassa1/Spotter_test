import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import TruckingList from "./pages/TruckingList/TruckingList";
import PivotTable from "./pages/PivotTable/PivotTable";
import "../node_modules/@syncfusion/ej2-base/styles/material.css";
import "../node_modules/@syncfusion/ej2-buttons/styles/material.css";
import "../node_modules/@syncfusion/ej2-dropdowns/styles/material.css";
import "../node_modules/@syncfusion/ej2-grids/styles/material.css";
import "../node_modules/@syncfusion/ej2-inputs/styles/material.css";
import "../node_modules/@syncfusion/ej2-lists/styles/material.css";
import "../node_modules/@syncfusion/ej2-navigations/styles/material.css";
import "../node_modules/@syncfusion/ej2-popups/styles/material.css";
import "../node_modules/@syncfusion/ej2-splitbuttons/styles/material.css";
import "../node_modules/@syncfusion/ej2-calendars/styles/material.css";
import "../node_modules/@syncfusion/ej2-react-pivotview/styles/material.css";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" index={true} element={<PivotTable />} />
        {/* <Route path="/" index={true} element={<TruckingList />} /> */}
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
