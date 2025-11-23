import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../../context/Usercontext"

export default function Header() {
  const { http, photo, setphoto } = useContext(UserContext)
  const navigate = useNavigate()
  const user = sessionStorage.getItem("userName")
  const [editperfil, seteditperfil] = useState(false)

  const handleFile = (e) => {
    const file = e.target.files[0]
    const reader = new FileReader()

    reader.onloadend = async () => {
      const base64 = reader.result
      try {
        await fetch(http + "/update-photo", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: sessionStorage.getItem("user"),
            photo: base64,
          }),
        })
        setphoto(base64)
      } catch (error) {
        console.log("deu errado")
      }
    }

    reader.readAsDataURL(file)
  }

  return (
    <header>
      <div
        className="header-div-perfil"
        onClick={() => {
          seteditperfil(true)
        }}
      >
        <h1>{user}</h1>
        <img
          src={photo ? photo : sessionStorage.getItem("photo")}
          alt="Foto"
          style={{ width: 50, height: 50, borderRadius: "50%" }}
        />
      </div>

      {editperfil && (
        <>
          <div className="div-editarperfil">
            <button
              className="div-editarperfil-back"
              onClick={() => {
                seteditperfil(false)
              }}
            >
              X
            </button>

            <div className="div-editarperfil-infos">
              <img
                src={photo ? photo : sessionStorage.getItem("photo")}
                alt="Foto"
                style={{ width: 75, height: 75, borderRadius: "50%" }}
              />
              <label for="fileInput" class="custom-file">
                Selecionar arquivo
              </label>
              <input
                type="file"
                id="fileInput"
                onChange={(e) => {
                  handleFile(e)
                }}
              />
            </div>
            <button
              className="div-editarperfil-buttonexit"
              onClick={() => {
                navigate("/selectApp")
              }}
            >
              Back
            </button>
          </div>
        </>
      )}
    </header>
  )
}
