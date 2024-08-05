import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { DataFromExcelProvider } from "./context/GetDataFromExcelContext";
import "react-toastify/dist/ReactToastify.css";
import { registerLicense } from "@syncfusion/ej2-base";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
registerLicense(
  "Ngo9BigBOggjHTQxAR8/V1NCaF1cWWhAYVdpR2Nbe05zflBEal5YVBYiSV9jS3pTfkVmWHpbc3RURGVdVw=="
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <DataFromExcelProvider>
        <App />
      </DataFromExcelProvider>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
