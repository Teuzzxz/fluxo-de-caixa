import { useState, useContext, useEffect } from "react"
import { UserContext } from "../../../../../context/Usercontext.jsx"

import Deletefluxo from "../functions/deletefluxo.js"
import { editFluxo } from "../functions/fetchAPI.js"
import getCategoria from "../functions/getCategoria.js"

import Styles from "../fluxo.module.css"

export default function Editfluxo({ onClose, element, reload, msg }) {
   const formatMoneyBR = (value) => {
      if (value === null || value === undefined || isNaN(value)) {
         return "0,00"
      }

      return Number(value).toLocaleString("pt-BR", {
         minimumFractionDigits: 2,
         maximumFractionDigits: 2,
      })
   }
   //------------------
   const [form, setform] = useState({
      _id: element._id,
      userID: element.userID,
      tipo: element.tipo,
      valor: element.valor,
      valorNumber: formatMoneyBR(element.valor),
      descrição: element.descrição,
      data: element.data,
      categoria: element.categoria,
      formadepagamento: element.formadepagamento,
      observação: element.observação,
   })

   //------------------

   const { http } = useContext(UserContext)
   const [categoria, setCategoria] = useState([])

   //------------------

   useEffect(() => {
      getCategoria(setCategoria)
   }, [])

   const handlechanger = (field, value) => {
      setform((prev) => ({ ...prev, [field]: value }))
   }

   const formatCurrencyBR = (valueInCents) => {
      const value = valueInCents / 100
      return value.toLocaleString("pt-BR", {
         minimumFractionDigits: 2,
         maximumFractionDigits: 2,
      })
   }

   const handleChangevalue = (e) => {
      let numbers = e.target.value.replace(/\D/g, "")
      if (!numbers) numbers = "0"
      const valueInCents = Number(numbers)
      const valueNumber = valueInCents / 100
      const valueFormatted = formatCurrencyBR(valueInCents)

      handlechanger("valorNumber", valueFormatted)
      handlechanger("valor", valueNumber)
   }

   //------------------

   const delAPI = async () => {
      const result = await Deletefluxo(element, http)
      if (result.ok) {
         msg([true, result.menssager])
         onClose()
         reload()
         setTimeout(() => {
            msg([false, ""])
         }, 1500)
      }
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
                  <h1>Editar fluxo</h1>
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
                        value={form.valorNumber}
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
                           editFluxo(http, form, msg, reload, onClose)
                        }}
                     >
                        Enviar
                     </button>

                     <button
                        id={Styles.action_del}
                        onClick={() => {
                           delAPI()
                        }}
                     >
                        🗑️
                     </button>
                  </div>
               </div>
            </div>
         </div>
      </>
   )
}
