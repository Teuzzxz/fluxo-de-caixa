import { useEffect, useState, useContext } from "react"
import { UserContext } from "../../context/Usercontext"
import { useNavigate } from "react-router-dom"

export default function VerifyLogin({ children }) {
   const { http } = useContext(UserContext)
   const [estaLogado, setEstaLogado] = useState(null)
   const navigate = useNavigate()

   useEffect(() => {
      const verificarLogado = async () => {
         try {
            const resposta = await fetch(http + "/logado", {
               method: "GET",
               credentials: "include",
            })

            if (resposta.ok) {
               console.log("já logado")
               setEstaLogado(true)
            } else {
               console.log("Não está logado")
               setEstaLogado(false)
            }
         } catch (error) {
            console.log("Erro no try/catch")
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
