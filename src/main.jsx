import { createRoot } from "react-dom/client";
import "./index.css";

import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    {/*<div className={`flex h-screen bg-erp-soft-gray`}>*/}
    {/*  <div className={`flex flex-col w-full`}>*/}
        <BrowserRouter>
          <App />
        </BrowserRouter>
    {/*  </div>*/}
    {/*</div>*/}
  </AuthProvider>
);
