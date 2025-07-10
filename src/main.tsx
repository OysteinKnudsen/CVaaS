import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import React from "react";
import { Provider } from "./components/ui/provider.tsx";
import { Analytics } from "@vercel/analytics/next"

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider>
      <App />
      <Analytics />
    </Provider>
  </React.StrictMode>
);


