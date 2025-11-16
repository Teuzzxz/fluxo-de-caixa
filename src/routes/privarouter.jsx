import { Navigate } from "react-router-dom"
import { useContext } from "react"
import { UserContext } from "../context/Usercontext"

export default function Private({ children }) {
  const { login } = useContext(UserContext)
  return login ? children : <Navigate to="/" />
}
