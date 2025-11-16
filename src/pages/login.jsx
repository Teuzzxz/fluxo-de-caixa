import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../context/Usercontext"
import "../style/Login.css"

export default function Login() {
  const navigate = useNavigate()
  const { http, setlogin, setUsuario } = useContext(UserContext)

  const [name, setname] = useState("")
  const [password, setpassword] = useState("")

  return (
    <nav className="login-nav">
      <input
        placeholder="User"
        className="login-input"
        type="text"
        value={name}
        onChange={(evt) => {
          setname(evt.target.value)
        }}
      />
      <input
        placeholder="Password"
        className="login-input"
        type="text"
        value={password}
        onChange={(evt) => {
          setpassword(evt.target.value)
        }}
      />
      <button
        className="login-button"
        onClick={() => {
          fetch(http + "/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: name,
              password: password,
            }),
          })
            .then((res) => res.json())
            .then((res) => {
              if (res.status === 200) {
                console.log("✅ Login realizado com sucesso!")
                setlogin(true)
                setUsuario(res.usuario)
                navigate("/deshboard")
              } else {
                console.log("Credenciais erradas ou erro!")
              }
            })
            .catch((err) => {
              console.error("Erro na requisição:", err)
            })
        }}
      >
        Entrar
      </button>
      <p>
        Não tem conta?
        <span
          onClick={() => {
            navigate("/CreateAccount")
          }}
          style={{ cursor: "pointer", color: "blue" }}
        >
          Criar conta
        </span>
      </p>
    </nav>
  )
}
