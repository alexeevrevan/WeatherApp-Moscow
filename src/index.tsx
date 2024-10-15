import React from "react"; 
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

// Отключил строгий режим во избежании двойных рендеров
root.render(<App />);

reportWebVitals();
