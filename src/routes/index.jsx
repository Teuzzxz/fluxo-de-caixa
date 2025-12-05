import { HashRouter, Route, Routes, Navigate } from "react-router-dom"

//Middlewares
import VerifyToken from "./middlewares/VerifyToken.jsx"
import VerifyLogin from "./middlewares/VerifyLogin.jsx"
import DontOpenLogin from "./middlewares/DontOpenLogin.jsx"
import AdminRouter from "./middlewares/adminRouter.jsx"

//Pages
import Login from "../login.jsx"
import CasaCmg from "../App/FluxoDeCaixa/secret/casacmg.jsx"
import Deshboard from "../App/FluxoDeCaixa/deshboard"
import CreateAccount from "../createaccount.jsx"
import SelectApp from "../selecApp.jsx"
import Admin from "../admin.jsx"
import Treinos from "../App/Treinos/deshboard.jsx"

export default function Rotas() {
   return (
      <HashRouter>
         <Routes>
            <Route
               path="/admin"
               element={
                  <AdminRouter>
                     <Admin />
                  </AdminRouter>
               }
            />

            <Route path="*" element={<Navigate to="/" replace />} />
            <Route path="/" element={<VerifyToken />} />

            <Route
               path="/Login"
               element={
                  <DontOpenLogin>
                     <Login />
                  </DontOpenLogin>
               }
            />
            <Route path="/love" element={<CasaCmg />} />
            <Route
               path="/selectApp"
               element={
                  <VerifyLogin>
                     <SelectApp />
                  </VerifyLogin>
               }
            />
            <Route path="/createaccount" element={<CreateAccount />} />
            <Route
               path="/FluxoDeCaixa-Deshboard"
               element={
                  <VerifyLogin>
                     <Deshboard />
                  </VerifyLogin>
               }
            />
            <Route
               path="/Treinos-Deshboard"
               element={
                  <VerifyLogin>
                     <Treinos />
                  </VerifyLogin>
               }
            />
         </Routes>
      </HashRouter>
   )
}
