import { createContext, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
export const UserContext = createContext()

export function Provider({ children }) {
  const render = "https://fluxo-de-caixa-api.onrender.com"
  const localhost = "http://localhost:4000"
  // const navigate = useNavigate()
  const http = render //rota patrao, se alterar altera em todos , mais fácil
  const [usuario, setUsuario] = useState([]) // lista de todos os usuário
  const [login, setlogin] = useState(false) // Se está logado
  const [userselect, setuserselect] = useState("") //Usuário selecionado

  useEffect(() => {
    if (!usuario) {
      setlogin(false)
    }
    console.log(usuario)
  }, [usuario])

  return (
    <UserContext.Provider
      value={{
        setlogin,
        setUsuario,
        http,
        login,
        usuario,
        userselect,
        setuserselect,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}
