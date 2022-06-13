// Client
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";
import App from "./App";

// Hydrate the root element created on the server
ReactDOM.hydrateRoot(
  document.getElementById("app") as Element | Document,
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
