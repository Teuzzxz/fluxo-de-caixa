import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export default function Secret() {
  const navigate = useNavigate()
  useEffect(() => {
    const secret = "laryssa"
    let typed = ""

    const handleKeyPress = (e) => {
      typed += e.key.toLowerCase()

      if (typed.length > secret.length) {
        typed = typed.slice(-secret.length)
      }

      // verifica se digitou certo
      if (typed === secret) {
        navigate("/love")
        typed = ""
      }
    }

    window.addEventListener("keydown", handleKeyPress)

    return () => {
      window.removeEventListener("keydown", handleKeyPress)
    }
  }, [])

  return null
}
