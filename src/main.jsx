import React from "react";
import ReactDOM from "react-dom/client";
import { AuthProvider } from "./context/AuthContext"
// Importamos el componente raíz
import App from "./App.jsx";

// Importante: trae Tailwind a la app
import "./index.css";

// Punto de entrada de la app
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>       {/* ← envuelve todo */}
      <App />
    </AuthProvider>
  </React.StrictMode>
);