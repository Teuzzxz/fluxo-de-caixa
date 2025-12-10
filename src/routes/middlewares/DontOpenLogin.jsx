import { useEffect, useState, useContext } from "react"
import { UserContext } from "../../context/Usercontext"
import { useNavigate } from "react-router-dom"

export default function DontOpenLogin({ children }) {
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

            const res = await resposta.json()

            if (res.ok) {
               console.log("já logado")
               setEstaLogado(true)
            } else {
               setEstaLogado(false)
            }
         } catch (error) {
            console.log("Erro no try/catch")
            setEstaLogado(false)
         }
      }

      verificarLogado()
   }, [http])

   // agora navega no momento correto
   useEffect(() => {
      if (estaLogado === true) {
         navigate("/SelectApp")
      }
   }, [estaLogado, navigate])

   // enquanto verifica o estado inicial
   if (estaLogado === null) {
      return <div>Carregando...</div>
   }

   // se NÃO estiver logado, pode abrir a página de login
   return children
}
