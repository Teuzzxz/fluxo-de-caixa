import { useNavigate } from "react-router-dom"
import { useContext, useEffect } from "react"
import { UserContext } from "../context/Usercontext"

export default function Logado({ children }) {
  const { login } = useContext(UserContext)
  const navigate = useNavigate()

  useEffect(() => {
    if (login) {
      navigate("/Deshboard")
    }
  }, [login, navigate])
  return !login ? children : null
}
