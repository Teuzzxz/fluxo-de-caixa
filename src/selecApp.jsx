import { UserContext } from "./context/Usercontext"
import { useContext, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
export default function SelectApp() {
  const { usuario } = useContext(UserContext)
  const navigate = useNavigate()
  return (
    <>
      <h1>OLA bom dia:{usuario}</h1>
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
