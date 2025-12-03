import { useNavigate } from "react-router-dom"
import { useContext } from "react"
import { UserContext } from "./context/Usercontext.jsx"

export default function SelectApp() {
   const { http } = useContext(UserContext)
   const user = sessionStorage.getItem("userName")
   const navigate = useNavigate()
   return (
      <>
         <h1>OLA bom dia:{user}</h1>
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
         <button
            onClick={() => {
               navigate("/Deshboard-FluxoDeCaixa")
            }}
         >
            {" "}
            FLUXO DE CAIXA
         </button>
      </>
   )
}
