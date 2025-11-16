import React from "react"
import ReactDOM from "react-dom/client"
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import Rotas from "./routes/index.jsx"
import { Provider } from "./context/Usercontext.jsx"
import "./style/main.css"

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider>
      <Rotas />
    </Provider>
  </StrictMode>
)
