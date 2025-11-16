import { createContext, useState, useEffect, use } from "react"

export const UserContext = createContext()

export function Provider({ children }) {
  //rota patrao, se alterar altera em todos , mais fácil
  const http = "https://1fdda8cb800f.ngrok-free.app"
  // lista de todos os usuário
  const [usuarios, setUsuarios] = useState([])
  // Se está logado
  const [login, setlogin] = useState(true)
  //Usuário selecionado
  const [userselect, setuserselect] = useState("")

  // useEffect(() => {
  //   console.log(login)
  // }, [login])

  return (
    <UserContext.Provider
      value={{
        setlogin,
        setUsuarios,
        http,
        login,
        usuarios,
        userselect,
        setuserselect,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}
