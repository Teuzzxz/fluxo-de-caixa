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
                     handleOpen() //Fechar o menu
                     setTimeout(() => {
                        setactivemodal((prev) => ({ ...prev, screen: "new" })) //Abre a tela
                     }, 250)
                  }}
               >
                  Add Fluxo
               </button>
               <button
                  onClick={() => {
                     handleOpen() //Fechar o menu
                     setTimeout(() => {
                        setactivemodal((prev) => ({ ...prev, screen: "graficos" })) //Abre a tela
                     }, 250)
                  }}
               >
                  Graficos
               </button>
               <button
                  onClick={() => {
                     handleOpen()
                     setTimeout(() => {
                        setactivemodal((prev) => ({ ...prev, screen: "categorias" })) //Abre a tela
                     }, 250)
                  }}
               >
                  Editar categorias
               </button>
               <button
                  onClick={() => {
                     handleOpen()
                     setTimeout(() => {
                        setactivemodal((prev) => ({ ...prev, screen: "bancos" })) //Abre a tela
                     }, 250)
                  }}
               >
                  Contas bancárias
               </button>
               <button>Deshboard Anual</button>
               <SairdoApp />
            </div>
         </div>
      </>
   )
}
