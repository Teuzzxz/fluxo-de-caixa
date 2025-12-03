import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { UserContext } from "./context/Usercontext"
import Menssager from "./components/menssager.jsx"

export default function CreateAccount() {
   const { http } = useContext(UserContext)

   const navigate = useNavigate()

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
                  // if (name === "" || password === "") {
                  //    setcallmenssager([true, "Faltam informações"])
                  //    setTimeout(() => {
                  //       setcallmenssager([false, ""])
                  //    }, 1500)
                  //    return
                  // }
                  try {
                     const FetchAPI = async () => {
                        const response = await fetch(http + "/auth/register", {
                           method: "POST",
                           headers: {
                              "Content-Type": "application/json",
                           },
                           body: JSON.stringify({ email: name, password: password }),
                           credentials: "include",
                        })
                        const res = await response.json()
                        if (!res.ok) {
                           setpassword("")
                           setname("")
                           setcallmenssager([true, res.menssager])
                           setTimeout(() => {
                              setcallmenssager([false, ""])
                           }, 2000)
                           return
                        }
                        if (res.ok) {
                           console.log("✅ Conta criada com sucesso!")
                           navigate("/selectApp")
                           setcallmenssager([false, res.menssager])
                           setTimeout(() => {
                              setcallmenssager([false, ""])
                           }, 2000)
                           return
                        }
                     }
                     FetchAPI()
                  } catch (error) {
                     console.log("Erro no try/catch FRONTEND" + error)
                  }
               }}
            >
               Criar conta
            </button>
            <p>
               Já tem uma conta?
               <span
                  onClick={() => {
                     navigate("/")
                  }}
                  style={{ cursor: "pointer", color: "blue" }}
               >
                  Entrar
               </span>
            </p>
            {callmenssager[0] && <Menssager menssager={callmenssager[1]} />}
         </nav>
      </>
   )
}
