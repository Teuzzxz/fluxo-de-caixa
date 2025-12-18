import { createContext, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
export const UserContext = createContext()

export function Provider({ children }) {
   const render = "https://api.backroom.website"
   const localhost = "http://localhost:4000"
   const http = localhost
   const [apps, setApps] = useState([])
   const [fluxoAtual, setfluxoAtual] = useState([])

   return (
      <UserContext.Provider
         value={{
            http,
            apps,
            setApps,
            fluxoAtual,
            setfluxoAtual,
         }}
      >
         {children}
      </UserContext.Provider>
   )
}
