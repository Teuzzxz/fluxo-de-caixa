import { useState, useContext } from "react"
import { UserContext } from "../../../../context/Usercontext.jsx"

import { addBanco } from "./functions/fetchAPI.js"

export default function AddBancos({ onClose }) {
   const { http } = useContext(UserContext)
   const [form, setform] = useState({
      nome: "",
      aonde: "",
   })

   const handleForm = (field, e) => {
      setform((prev) => ({ ...prev, [field]: e }))
   }

   return (
      <>
         <div>
            <div>
               <h1>Adicionar bancos</h1>
               <button
                  onClick={() => {
                     onClose()
                  }}
               >
                  x
               </button>
            </div>
            <div>
               <div>
                  <label htmlFor="NOMEDOBANCO">Nome do banco</label>
                  <input
                     type="text"
                     id="NOMEDOBANCO"
                     value={form.nome}
                     onChange={(e) => {
                        handleForm("nome", e.target.value)
                     }}
                  />
               </div>

               <div>
                  <label htmlFor="AONDE">Aonde</label>
                  <input
                     type="text"
                     id="AONDE"
                     placeholder="Porquinho, Conta corrente..."
                     value={form.aonde}
                     onChange={(e) => {
                        handleForm("aonde", e.target.value)
                     }}
                  />
               </div>
               <button
                  onClick={() => {
                     addBanco(http, form)
                  }}
               >
                  Adicionar
               </button>
            </div>
         </div>
      </>
   )
}
