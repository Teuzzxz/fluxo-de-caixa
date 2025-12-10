import { useState, useContext, useEffect } from "react"
import { UserContext } from "../../../context/Usercontext.jsx"
import Menssager from "../../../components/menssager.jsx"
import { loadUserItems } from "../functions/categoria.jsx"

export default function AddFluxo({ onClose, reload }) {
   const { http, usuario } = useContext(UserContext)
   const data = new Date()
   const [date, setdate] = useState(data.toISOString().split("T")[0])

   //------------------

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

   //------------------

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

   const FetchAPI = async () => {
      if (form.valor === "" || form.data === "") {
         setcallmenssager([true, "Valor/Data nao definido❌"])
         setTimeout(() => {
            setcallmenssager([false, ""])
         }, 1500)
         return
      }

      const response = await fetch(http + "/fluxo/add", {
         method: "post",
         headers: {
            "Content-Type": "application/json",
         },
         credentials: "include",
         body: JSON.stringify(form),
      })

      const res = await response.json()

      if (res.ok) {
         setcallmenssager([true, "Fluxo adicionado com sucesso✅"])
         setTimeout(() => {
            setcallmenssager([false, ""])
         }, 1500)
         setform((prev) => ({
            ...prev,
            tipo: "Saída",
            valor: "",
            descrição: "",
            categoria: "Compras",
            formadepagamento: "Pix",
            observação: "",
         }))
         reload()
      }

      if (!res.ok) {
         setcallmenssager([true, "Erro!"])
         setTimeout(() => {
            setcallmenssager([false, ""])
         }, 1500)
      }
   }

   //------------------

   const handlechanger = (field, value) => {
      setform((prev) => ({ ...prev, [field]: value }))
   }

   const [callmenssager, setcallmenssager] = useState([false, ""])
   return (
      <>
         <div className="FDC-add-editFluxo">
            <div className="FDC-add-editFluxo-title">
               <h1>Adicionar fluxo</h1>
               <button
                  onClick={() => {
                     onClose()
                  }}
               >
                  ❌
               </button>
            </div>

            <div className="FDC-add-editFluxo-divs">
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

            <div className="FDC-add-editFluxo-divs">
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

            <div className="FDC-add-editFluxo-divs">
               <label htmlFor="VALOR">Valor:</label>
               <input
                  id="VALOR"
                  type="number"
                  value={form.valor}
                  onChange={(evt) => {
                     handlechanger("valor", evt.target.value)
                  }}
               />
            </div>

            <div className="FDC-add-editFluxo-divs">
               <label htmlFor="DESCRICAO">Descrição :</label>
               <input
                  id="DESCRICAO"
                  type="text"
                  value={form.descrição}
                  onChange={(evt) => {
                     handlechanger("descrição", evt.target.value)
                  }}
               />
            </div>

            {form.tipo !== "Entrada" && (
               <div className="FDC-add-editFluxo-divs">
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
               <div className="FDC-add-editFluxo-divs">
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

            <div className="FDC-add-editFluxo-divs">
               <label htmlFor="OBSERVACAO">observação:</label>
               <input
                  id="OBSERVACAO"
                  type="text"
                  value={form.observação}
                  onChange={(evt) => {
                     handlechanger("observação", evt.target.value)
                  }}
               />
            </div>

            <div className="FDC-add-editFluxo-div-button-enviar ">
               <button
                  className="FDC-add-editFluxo-button-enviar"
                  onClick={() => {
                     FetchAPI()
                  }}
               >
                  Enviar
               </button>
            </div>

            {callmenssager[0] && <Menssager menssager={callmenssager[1]} />}
         </div>
      </>
   )
}
