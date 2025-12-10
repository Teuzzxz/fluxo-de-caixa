import { useEffect, useState, useContext } from "react"
import { UserContext } from "../../context/Usercontext"
import { useNavigate } from "react-router-dom"

export default function VerifyToken({ children }) {
   const { http, setApps } = useContext(UserContext)
   const [estaLogado, setEstaLogado] = useState(null)
   const navigate = useNavigate()

   useEffect(() => {
      const verificarLogado = async () => {
         try {
            const resposta = await fetch(http + "/logado", {
               method: "GET",
               credentials: "include",
            })

            const res = await resposta.json()

            if (res.ok) {
               setEstaLogado(true)
            }
            if (!res.ok) {
               console.log(res.menssager)
               setEstaLogado(false)
            }
         } catch (error) {
            console.error(error)
            setEstaLogado(false)
         }
      }

      verificarLogado()
   }, [http])

   // Aqui navegamos corretamente
   useEffect(() => {
      if (estaLogado === true) {
         navigate("/SelectApp")
      }

      if (estaLogado === false) {
         navigate("/Login")
      }
   }, [estaLogado, navigate])

   if (estaLogado === null) {
      return <div>Carregando...</div>
   }

   // enquanto redireciona
   return null
}
