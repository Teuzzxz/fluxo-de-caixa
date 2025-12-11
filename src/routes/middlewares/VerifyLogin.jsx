import { useEffect, useState, useContext } from "react"
import { UserContext } from "../../context/Usercontext"
import { useNavigate } from "react-router-dom"

export default function VerifyLogin({ children }) {
   const { http, setApps } = useContext(UserContext)
   const [estaLogado, setEstaLogado] = useState(null)
   const navigate = useNavigate()

   useEffect(() => {
      const verificarLogado = async () => {
         try {
            const resposta = await fetch(http + "/logado", {
               method: "POST",
               headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
               },
               credentials: "include",
            })
            const res = await resposta.json()
            console.log(res)

            if (res.ok) {
               setEstaLogado(true)
               setApps(res.apps)
            }
            if (!res.ok) {
               setEstaLogado(false)
            }
         } catch (error) {
            console.log(error)
            setEstaLogado(false)
         }
      }

      verificarLogado()
   }, [http])

   useEffect(() => {
      if (estaLogado === false) {
         navigate("/Login")
      }
   }, [estaLogado, navigate])

   if (estaLogado === null) {
      return <div>Carregando...</div>
   }

   return children
}
