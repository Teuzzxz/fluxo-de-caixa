import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../../context/Usercontext"
import EditCategoria from "./components/editcategorias"

export default function Header() {
   const [editPerfil, seteditPerfil] = useState(false)
   const [editCategoria, seteditCategoria] = useState(false)

   const navigate = useNavigate()
   return (
      <>
         <header className="FDC-Header">
            <div className="FDC-Header-D1">
               <h1 className="FDC-Header-Titulo">Fluxo de caixa</h1>
            </div>
            <div className="FDC-Header-D2">
               <h1
                  className="FDC-Header-Configurações"
                  onClick={() => {
                     seteditPerfil(true)
                  }}
               >
                  ⚙️
               </h1>
            </div>
         </header>

         {editPerfil && (
            <>
               <div className="FDC-Header-EditarPerfil">
                  <div className="FDC-Header-EditarPerfil-title">
                     <h2>Configurações</h2>
                     <button
                        onClick={() => {
                           seteditPerfil(false)
                        }}
                     >
                        ❌
                     </button>
                  </div>

                  <button
                     className="FDC-Header-EditarPerfil-Button"
                     onClick={() => {
                        seteditCategoria(true)
                     }}
                  >
                     Editar categorias
                  </button>

                  <button
                     className="FDC-Header-EditarPerfil-Button"
                     onClick={() => {
                        navigate("/SelectApp")
                     }}
                  >
                     Sair
                  </button>
               </div>
            </>
         )}
         {editCategoria && (
            <EditCategoria
               onClose={() => {
                  seteditCategoria(false)
               }}
            />
         )}
      </>
   )
}
