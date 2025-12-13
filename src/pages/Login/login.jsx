import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../../context/Usercontext.jsx"
import Menssager from "../../components globais/menssager.jsx"
import "./Login.css"

export default function Login() {
   const navigate = useNavigate()
   const { http, photo, setphoto } = useContext(UserContext)
   const [name, setname] = useState("")
   const [password, setpassword] = useState("")
   const [callmenssager, setcallmenssager] = useState([false, ""])
   return (
      <>
         <nav className="login-nav">
            <input
               placeholder="User"
               className="login-input"
               type="text"
               value={name}
               onChange={(evt) => {
                  setname(evt.target.value)
               }}
            />
            <input
               placeholder="Password"
               className="login-input"
               type="text"
               value={password}
               onChange={(evt) => {
                  setpassword(evt.target.value)
               }}
            />
            <button
               className="login-button"
               onClick={() => {
                  setcallmenssager([true, "Carregando"])
                  try {
                     const FetchAPI = async () => {
                        const response = await fetch(http + "/auth/login", {
                           method: "POST",
                           headers: {
                              "Content-Type": "application/json",
                           },
                           body: JSON.stringify({
                              email: name,
                              password: password,
                           }),
                           credentials: "include",
                        })
                        const res = await response.json()
                        if (!res.ok) {
                           setpassword("")
                           setname("")
                           setcallmenssager([true, res.menssager])
                           setTimeout(() => {
                              setcallmenssager([false, ""])
                           }, 1500)
                           return
                        }
                        if (res.ok) {
                           console.log("✅ Login realizado com sucesso!")
                           navigate("/selectApp")
                           setcallmenssager([false, res.menssager])
                           setTimeout(() => {
                              setcallmenssager([false, ""])
                           }, 1500)
                           return
                        }
                     }
                     FetchAPI()
                  } catch (error) {
                     console.log("Erro no try/catch FRONTEND" + error)
                  }
               }}
            >
               Entrar
            </button>
            <p>
               Não tem conta?
               <span
                  onClick={() => {
                     navigate("/CreateAccount")
                  }}
                  style={{ cursor: "pointer", color: "blue" }}
               >
                  Criar conta
               </span>
            </p>
         </nav>
         {callmenssager[0] && <Menssager menssager={callmenssager[1]} />}
      </>
   )
}
