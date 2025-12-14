import { useNavigate } from "react-router-dom"
import { useContext } from "react"
import { UserContext } from "../../context/Usercontext.jsx"
import { loadUserItems } from "../../App/FluxoDeCaixa/components/categoria/functions/categoria.jsx"

import "./selectApp.css"

export default function SelectApp() {
   loadUserItems()
   const { http, apps } = useContext(UserContext)

   const navigate = useNavigate()
   return (
      <>
         <button
            className="SelectApp-apps-logout"
            onClick={() => {
               const Logout = async () => {
                  try {
                     const resposta = await fetch(http + "/logout", {
                        method: "POST",
                        credentials: "include",
                     })
                     const res = await resposta.json()

                     if (res.ok) {
                        navigate("/")
                     }
                     if (!res.ok) {
                        console.log("BACKERRO")

                        console.log(res.error)
                     }
                  } catch (error) {
                     console.log(error)
                  }
               }
               Logout()
            }}
         >
            Sair
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
            </div>
         </div>
      </>
   )
}
