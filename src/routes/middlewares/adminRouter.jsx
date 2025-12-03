import { Navigate } from "react-router-dom"
import { useEffect, useState, useContext } from "react"
import { useNavigate } from "react-router-dom"

import { UserContext } from "../../context/Usercontext"

export default function AdminRouter({ children }) {
   const [estaLogado, setEstaLogado] = useState(null)
   const { http } = useContext(UserContext)
   const navigate = useNavigate()

   useEffect(() => {
      const verificarLogin = async () => {
         try {
            const resposta = await fetch(http + "/admin", {
               method: "GET",
               credentials: "include",
            })

            if (resposta.ok) {
               setEstaLogado(true)
               console.log("deu certo")
            } else {
               setEstaLogado(false)
               console.log("deu errado")
               console.log(resposta)
            }
         } catch (error) {
            setEstaLogado(false)
         }
      }

      verificarLogin()
   }, [])
   if (estaLogado === null) {
      return <div>Carregando</div>
   }
   return estaLogado ? children : navigate("/")
}
