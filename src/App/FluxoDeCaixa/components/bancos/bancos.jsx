import { useContext, useState } from "react"
import { UserContext } from "../../../../context/Usercontext"

import { getBancos, addBanco } from "./functions/fetchAPI.js"
import AddBancos from "./addbancos.jsx"

import Styles from "./bancos.module.css"

export default function Bancos({ onClose }) {
   const [novoBanco, setnovoBanco] = useState(false)

   const { http } = useContext(UserContext)

   return (
      <>
         <div className={Styles.container}>
            <div className={Styles.title}>
               <h1>Bancos</h1>
               <button
                  onClick={() => {
                     onClose()
                  }}
               >
                  x
               </button>
            </div>
            <div className={Styles.action}>
               <button
                  onClick={() => {
                     setnovoBanco(true)
                  }}
               >
                  Add banco
               </button>
            </div>
            {novoBanco && <AddBancos />}
         </div>
      </>
   )
}
