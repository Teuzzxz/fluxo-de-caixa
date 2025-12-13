import { useState } from "react"

import Styles from "./header.module.css"

export default function Header({ handleOpen }) {
   return (
      <>
         <header className={Styles.container}>
            <div className={Styles.title}>
               <h1>Fluxo de caixa</h1>
            </div>

            <div className={Styles.container_2}>
               <div className={Styles.user}>
                  <img src="./user.png" />
               </div>
               <div
                  className={Styles.menu}
                  onClick={() => {
                     handleOpen()
                  }}
               >
                  <h1>☰</h1>
               </div>
            </div>
         </header>
      </>
   )
}
