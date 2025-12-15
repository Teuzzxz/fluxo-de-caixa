import { loadUserItems, removeItem, addItem } from "./functions/categoria.jsx"
import { useState, useEffect } from "react"

import Style from "./categorias.module.css"

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
         <div className={Style.overlay}>
            <div
               className={Style.container}
               onClick={(e) => {
                  e.stopPropagation()
               }}
            >
               <div className={Style.title}>
                  <h1>Editar categorias</h1>
                  <button
                     onClick={() => {
                        onClose()
                     }}
                  >
                     x
                  </button>
               </div>
               <div className={Style.categorias}>
                  {categoria.map((e, p) => {
                     return (
                        <div key={p}>
                           <p>{e}</p>
                           <div>
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
                  <div className={Style.categoria_add}>
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
            </div>
         </div>
      </>
   )
}
