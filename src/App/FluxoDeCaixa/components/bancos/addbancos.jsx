import { useState } from "react"

export default function AddBancos() {
   const [form, setform] = useState({
      nome: "",
      valor: "",
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
               <button>x</button>
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
                  <label htmlFor="NOMEDOBANCO">Valor</label>
                  <input
                     type="text"
                     id="NOMEDOBANCO"
                     value={form.valor}
                     onChange={(e) => {
                        handleForm("valor", e.target.value)
                     }}
                  />
               </div>
               <div>
                  <label htmlFor="NOMEDOBANCO">Aonde</label>
                  <input
                     type="text"
                     id="NOMEDOBANCO"
                     placeholder="Porquinho, Conta corrente..."
                     value={form.aonde}
                     onChange={(e) => {
                        handleForm("aonde", e.target.value)
                     }}
                  />
               </div>
               <button>Adicionar</button>
            </div>
         </div>
      </>
   )
}
