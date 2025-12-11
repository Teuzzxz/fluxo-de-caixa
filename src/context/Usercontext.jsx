import { createContext, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
export const UserContext = createContext()

export function Provider({ children }) {
   const render = "https://fluxo-de-caixa-api.onrender.com"
   const localhost = "http://localhost:4000"
   const http = render
   const [apps, setApps] = useState([])

   console.log(document.cookie)

   return (
      <UserContext.Provider
         value={{
            http,
            apps,
            setApps,
         }}
      >
         {children}
      </UserContext.Provider>
   )
}
