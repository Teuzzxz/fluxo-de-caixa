import { HashRouter, Route, Routes, Navigate } from "react-router-dom"

//Middlewares
import VerifyToken from "./middlewares/VerifyToken.jsx"
import VerifyLogin from "./middlewares/VerifyLogin.jsx"
import DontOpenLogin from "./middlewares/DontOpenLogin.jsx"
import AdminRouter from "./middlewares/adminRouter.jsx"

//Pages
import Login from "../pages/Login/login.jsx"
import CasaCmg from "../pages/secret/casacmg.jsx"
import Deshboard from "../App/FluxoDeCaixa/deshboard/deshboard.jsx"
import CreateAccount from "../pages/Login/createaccount.jsx"
import SelectApp from "../pages/selectApp/selecApp.jsx"
import Admin from "../pages/admin/admin.jsx"
import Treinos from "../App/Treinos/deshboard/deshboard.jsx"

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
