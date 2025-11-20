import { HashRouter, Route, Routes, Navigate } from "react-router-dom"

import Login from "../login.jsx"
import Deshboard from "../App/FluxoDeCaixa/deshboard"
import CreateAccount from "../App/FluxoDeCaixa/components/createaccount.jsx"
import CasaCmg from "../App/FluxoDeCaixa/secret/casacmg"
import SelectApp from "../selecApp.jsx"

//Rotas protegidas

import Private from "./privarouter"

export default function Rotas() {
  return (
    <HashRouter>
      <Routes>
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path="/" element={<Login />} />
        <Route
          path="/selectApp"
          element={
            <Private>
              <SelectApp />
            </Private>
          }
        />
        <Route path="/createaccount" element={<CreateAccount />} />
        <Route path="/love" element={<CasaCmg />} />
        <Route
          path="/Deshboard-FluxoDeCaixa"
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
