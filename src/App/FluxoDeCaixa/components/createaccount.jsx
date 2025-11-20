import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../../../context/Usercontext"

export default function CreateAccount() {
  const { http, usuarios, setUsuarios, setuserselect } = useContext(UserContext)

  const navigate = useNavigate()

  const [name, setname] = useState("")
  const [password, setpassword] = useState("")
  return (
    <>
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
            fetch(http + "/createuser", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ name: name, password: password }),
            }).then(async (res) => {
              const status = res.status
              if (status === 200) {
                navigate("/")
              }
            })
          }}
        >
          Criar conta
        </button>
        <p>
          Já tem uma conta?
          <span
            onClick={() => {
              navigate("/")
            }}
            style={{ cursor: "pointer", color: "blue" }}
          >
            Entrar
          </span>
        </p>
      </nav>
    </>
  )
}
