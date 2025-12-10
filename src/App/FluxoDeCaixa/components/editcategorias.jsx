import { loadUserItems, removeItem, addItem } from "../functions/categoria.jsx"
import { useState, useEffect } from "react"

export default function EditCategoria({ onClose }) {
   const getLocal = () => {
      let array = localStorage.getItem("Categoria")
      if (array) {
         array = array.split(",")
         setCategoria(array)
      } else {
         loadUserItems()
         setCategoria(localStorage.getItem("Categoria").split(","))
      }
   }

   useEffect(() => {
      getLocal()
   }, [])

   const [categoria, setCategoria] = useState([])
   const [newCat, setnewCat] = useState("")

   return (
      <>
         <div className="FDC-Header-EditarCategorias">
            <div className="FDC-Header-EditarCategorias-title">
               <h1>Editar categorias</h1>
               <button
                  onClick={() => {
                     onClose()
                  }}
               >
                  ❌
               </button>
            </div>
            <div className="FDC-Header-EditarCategorias-categorias">
               {categoria.map((e, p) => {
                  return (
                     <div key={p} className="FDC-Header-EditarCategorias-categoria">
                        <p>{e}</p>
                        <div className="FDC-Header-EditarCategorias-categoria-button">
                           <button
                              onClick={() => {
                                 removeItem(e)
                                 getLocal()
                              }}
                           >
                              🗑️
                           </button>
                        </div>
                     </div>
                  )
               })}
            </div>
            <div className="FDC-Header-EditarCategorias-add">
               <input
                  type="text"
                  value={newCat}
                  onChange={(e) => {
                     setnewCat(e.target.value)
                  }}
               />
               <button
                  onClick={() => {
                     if (newCat) {
                        addItem(newCat)
                        getLocal()
                     }
                  }}
               >
                  Adicionar
               </button>
            </div>
         </div>
      </>
   )
}
