import { createContext, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
export const UserContext = createContext()

export function Provider({ children }) {
   const render = "https://fluxo-de-caixa-api.onrender.com"
   const localhost = "http://localhost:4000"
   const http = localhost
   const [photo, setphoto] = useState("")

   useEffect(() => {
      if (photo) {
         sessionStorage.setItem("photo", photo)
      }
   }, [photo])

   return (
      <UserContext.Provider
         value={{
            http,
            photo,
            setphoto,
         }}
      >
         {children}
      </UserContext.Provider>
   )
}
