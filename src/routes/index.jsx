import { HashRouter, Route, Routes, Navigate } from "react-router-dom"

import Login from "../pages/login"
import Deshboard from "../pages/deshboard"
import CreateAccount from "../pages/createaccount"
import CasaCmg from "../pages/components/secret/casacmg"
//Rotas protegidas
import Private from "./privarouter"
import Logado from "./logado"

export default function Rotas() {
  return (
    <HashRouter>
      <Routes>
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path="/" element={<Login />} />
        <Route path="/createaccount" element={<CreateAccount />} />
        <Route path="/love" element={<CasaCmg />} />
        <Route
          path="/Deshboard"
          element={
            <Private>
              <Deshboard />
            </Private>
          }
        />
      </Routes>
    </HashRouter>
  )
}
