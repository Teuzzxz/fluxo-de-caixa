import { useNavigate } from "react-router-dom"
export default function SelectApp() {
  const user = sessionStorage.getItem("userName")
  const navigate = useNavigate()
  return (
    <>
      <h1>OLA bom dia:{user}</h1>
      <button
        onClick={() => {
          sessionStorage.clear()
          navigate("/")
        }}
      >
        Logout
      </button>
      <button
        onClick={() => {
          navigate("/Deshboard-FluxoDeCaixa")
        }}
      >
        {" "}
        FLUXO DE CAIXA
      </button>
    </>
  )
}
