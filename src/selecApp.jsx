import { useNavigate } from "react-router-dom"
import { useContext } from "react"
import { UserContext } from "./context/Usercontext.jsx"
import { loadUserItems } from "./App/FluxoDeCaixa/functions/categoria.jsx"

import "./style/selectApp.css"

export default function SelectApp() {
   loadUserItems()
   const { http, apps } = useContext(UserContext)

   const navigate = useNavigate()
   return (
      <>
         <button
            onClick={() => {
               const Logout = async () => {
                  try {
                     const resposta = await fetch(http + "/logout", {
                        method: "POST",
                        credentials: "include",
                     })

                     if (resposta.ok) {
                        console.log("token apagado com sucesso")
                        location.reload()
                     }
                     if (!resposta.ok) {
                        console.log("deu erro")
                     }
                  } catch (error) {
                     console.log("erro no catch" + error)
                  }
               }
               Logout()
            }}
         >
            Logout
         </button>
         <div className="SelectApp-apps">
            <div
               className="
            SelectApp-apps-tittle"
            >
               <h2>Seus Apps</h2>
            </div>
            <div className="SelectApp-apps-Apps">
               {apps.map((e, p) => {
                  let img = "confused-icon.png"
                  let path = "/SelectApp"
                  if (e === "Fluxo de Caixa") {
                     img = "fluxo-de-caixa-icon.png"
                     path = "/FluxoDeCaixa-Deshboard"
                  }
                  if (e === "Admin") {
                     img = "admin-icon.png"
                     path = "/admin"
                  }
                  if (e === "Treino") {
                     img = "run-icon.png"
                     path = "/Treinos-Deshboard"
                  }
                  return (
                     <div className="SelectApp-apps-Apps-all" key={p}>
                        <img
                           src={img}
                           className="SelectApp-fluxoDeCaixa"
                           id="SELECTAPPS"
                           onClick={() => {
                              navigate(path)
                           }}
                        />
                        <label htmlFor="SELECTAPPS">{e}</label>
                     </div>
                  )
               })}
               {/* <div className="SelectApp-apps-Apps-FDC">
                  <img
                     id="SELECTAPPS-FDC"
                     className="SelectApp-fluxoDeCaixa"
                     onClick={() => {
                        navigate("/FluxoDeCaixa-Deshboard")
                     }}
                     src="fluxo-de-caixa-icon.png"
                  />
                  <label htmlFor="SELECTAPPS-FDC">FDC</label>
               </div> */}
            </div>
         </div>
      </>
   )
}
