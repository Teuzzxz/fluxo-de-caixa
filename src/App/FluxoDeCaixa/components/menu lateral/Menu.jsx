import { useState } from "react"
import Styles from "./menu.module.css"

//Functions
import SairdoApp from "./function/SairdoApp"

export default function Menulateral({ isOpen, handleOpen, setactivemodal }) {
   return (
      <>
         <div className={`${Styles.container} ${isOpen ? Styles.open : ""}`}>
            <div className={Styles.title}>
               <h1>Menu</h1>
               <button
                  onClick={() => {
                     handleOpen()
                  }}
               >
                  X
               </button>
            </div>

            <div className={Styles.buttons}>
               <button
                  onClick={() => {
                     handleOpen()
                     setTimeout(() => {
                        setactivemodal((prev) => ({ ...prev, screen: "new" }))
                     }, 250)
                  }}
               >
                  Add Fluxo
               </button>
               <button>Deshboard Anual</button>
               <button>Contas bancárias</button>
               <button>Graficos</button>
               <button>Editar categorias</button>
               <SairdoApp />
            </div>
         </div>
      </>
   )
}
