import { useNavigate } from "react-router-dom"

export default function SairdoApp() {
   const navigate = useNavigate()

   const handleClick = () => {
      navigate("/selectApp")
   }

   return <button onClick={handleClick}>Sair do App</button>
}
