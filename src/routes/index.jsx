import { HashRouter, Route, Routes, Navigate } from "react-router-dom"

import Login from "../App/FluxoDeCaixa/login.jsx"
import Deshboard from "../App/FluxoDeCaixa/deshboard"
import CreateAccount from "../App/FluxoDeCaixa/components/createaccount.jsx"
import CasaCmg from "../App/FluxoDeCaixa/secret/casacmg"
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
