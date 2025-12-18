import { useContext, useState, useEffect } from "react"
import { UserContext } from "../../../../context/Usercontext.jsx"

import { getBancos, lancamento } from "./functions/fetchAPI.js"

import AddBancos from "./addbancos.jsx"
import Laçamento from "./lançamento.jsx"

import Styles from "./bancos.module.css"

export default function Bancos({ onClose }) {
   const [novoBanco, setnovoBanco] = useState(false)
   const [novoLancamento, setnovoLancamento] = useState({ open: false, banco: "" })
   const [bancos, setbancos] = useState([])
   const { http } = useContext(UserContext)

   const reload = async () => {
      const res = await getBancos(http)
      setbancos(res.resposta)
   }

   useEffect(() => {
      reload()
   }, [])
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
               <button
                  onClick={() => {
                     reload()
                  }}
               >
                  reload
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
            <div>
               <h1>BANCOS</h1>
               <div>
                  {bancos.map((e, p) => {
                     return (
                        <div key={p}>
                           <h1>{e.nome}</h1>
                           <h1>{e.aonde}</h1>
                           <button
                              onClick={() => {
                                 setnovoLancamento({ open: true, banco: e })
                              }}
                           >
                              Adicionar mudança
                           </button>
                           <button>Excluir</button>
                        </div>
                     )
                  })}
               </div>
            </div>
            {novoBanco && (
               <AddBancos
                  onClose={() => {
                     setnovoBanco(false)
                  }}
               />
            )}
            {novoLancamento.open && (
               <Laçamento
                  onClose={() => {
                     setnovoLancamento({ open: false, banco: "" })
                  }}
                  banco={novoLancamento.banco}
               />
            )}
         </div>
      </>
   )
}
