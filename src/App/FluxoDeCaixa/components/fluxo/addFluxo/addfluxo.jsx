import { useState, useContext, useEffect } from "react"
import { UserContext } from "../../../../../context/Usercontext.jsx"

import { addNewFluxo } from "../functions/fetchAPI.js"
import getCategoria from "../functions/getCategoria.js"

import Styles from "../fluxo.module.css"

export default function AddFluxo({ onClose, msg, reload }) {
   //------------------

   //------------------

   const { http } = useContext(UserContext)
   const data = new Date()
   const [date, setdate] = useState(data.toISOString().split("T")[0])
   const [categoria, setCategoria] = useState([])
   const [form, setform] = useState({
      tipo: "Saída",
      valor: "",
      descrição: "",
      data: date,
      categoria: "",
      formadepagamento: "Pix",
      observação: "",
   })

   //------------------

   useEffect(() => {
      getCategoria(setCategoria)
   }, [])

   const handlechanger = (field, value) => {
      setform((prev) => ({ ...prev, [field]: value }))
   }

   const handleChangevalue = (e) => {
      // Remove tudo que não é número
      let numbers = e.target.value.replace(/\D/g, "")

      // Remove zeros à esquerda
      numbers = numbers.replace(/^0+/, "") || "0"

      // Garante pelo menos 3 dígitos (para ter centavos)
      numbers = numbers.padStart(3, "0")

      // Separa reais e centavos
      const reais = numbers.slice(0, -2)
      const centavos = numbers.slice(-2)

      // Formata com separador de milhar
      const reaisFormatado = Number(reais).toLocaleString("pt-BR")
      handlechanger("valor", `${reaisFormatado},${centavos}`)
   }
   return (
      <>
         <div
            className={Styles.overlay}
            onClick={() => {
               onClose()
            }}
         >
            <div
               className={Styles.container}
               onClick={(e) => {
                  e.stopPropagation()
               }}
            >
               <div className={Styles.title}>
                  <h1>Adicionar fluxo</h1>
                  <button
                     onClick={() => {
                        onClose()
                     }}
                  >
                     x
                  </button>
               </div>
               <div className={Styles.options}>
                  <div>
                     <label htmlFor="DATE">Data:</label>
                     <input
                        id="DATE"
                        type="date"
                        value={form.data}
                        onChange={(evt) => {
                           handlechanger("data", evt.target.value)
                        }}
                     />
                  </div>

                  <div>
                     <label htmlFor="TIPO">Tipo:</label>
                     <select
                        id="TIPO"
                        onChange={(evt) => {
                           handlechanger("tipo", evt.target.value)
                        }}
                        value={form.tipo}
                     >
                        <option value="Entrada">Entrada</option>
                        <option value="Saída">Saída</option>
                     </select>
                  </div>

                  <div>
                     <label htmlFor="VALOR">Valor:</label>
                     <input
                        id="VALOR"
                        type="text"
                        inputMode="numeric"
                        value={form.valor}
                        onChange={(e) => {
                           handleChangevalue(e)
                        }}
                     />
                  </div>

                  <div>
                     <label htmlFor="DESCRICAO">Descrição :</label>
                     <textarea
                        className={Styles.textarea}
                        id="DESCRICAO"
                        value={form.descrição}
                        onChange={(evt) => {
                           handlechanger("descrição", evt.target.value)
                        }}
                     ></textarea>
                  </div>

                  {form.tipo !== "Entrada" && (
                     <div>
                        <label htmlFor="CATEGORIA">Categoria:</label>
                        <select
                           id="CATEGORIA"
                           value={form.categoria}
                           onChange={(evt) => {
                              handlechanger("categoria", evt.target.value)
                           }}
                        >
                           <option value=""></option>
                           {categoria.map((e, p) => {
                              return (
                                 <option key={p} value={e}>
                                    {e}
                                 </option>
                              )
                           })}
                        </select>
                     </div>
                  )}

                  {form.tipo !== "Entrada" && (
                     <div>
                        <label htmlFor="FORMADEPAGAMENTO">Forma de pagamento:</label>
                        <select
                           id="FORMADEPAGAMENTO"
                           value={form.formadepagamento}
                           onChange={(evt) => {
                              handlechanger("formadepagamento", evt.target.value)
                           }}
                        >
                           <option value="Pix">Pix</option>
                           <option value="Cartão de crédito">Cartão de crédito</option>
                           <option value="Dinheiro">Dinheiro</option>
                           <option value="Parcelado">Parcelado</option>
                           <option value=""></option>
                        </select>
                     </div>
                  )}

                  <div>
                     <label htmlFor="OBSERVACAO">observação:</label>
                     <textarea
                        className={Styles.textarea}
                        id="OBSERVACAO"
                        value={form.observação}
                        onChange={(evt) => {
                           handlechanger("observação", evt.target.value)
                        }}
                     ></textarea>
                  </div>

                  <div className={Styles.action}>
                     <button
                        onClick={() => {
                           addNewFluxo(http, form, setform, msg, reload)
                        }}
                     >
                        Enviar
                     </button>
                  </div>
               </div>
            </div>
         </div>
      </>
   )
}
