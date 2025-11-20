import { createContext, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
export const UserContext = createContext()

export function Provider({ children }) {
  const render = "https://fluxo-de-caixa-api.onrender.com"
  const localhost = "http://localhost:4000"
  const http = localhost
  const [usuario, setUsuario] = useState([])
  // const [login, setlogin] = useState(false)
  const [userselect, setuserselect] = useState("")

  useEffect(() => {
    if (!usuario) {
      setlogin(false)
    }
  }, [usuario])

  return (
    <UserContext.Provider
      value={{
        setUsuario,
        http,
        usuario,
        userselect,
        setuserselect,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}
