import { useState, useContext, useEffect } from "react"
import { UserContext } from "../../../context/Usercontext.jsx"
import Menssager from "../../../components/menssager.jsx"

export default function AddFluxo({ onClose, reload }) {
   const { http, usuario } = useContext(UserContext)
   const data = new Date()
   const [date, setdate] = useState(data.toISOString().split("T")[0])

   //States das informações abaixo

   const [form, setform] = useState({
      tipo: "Saída",
      valor: "",
      descrição: "",
      data: date,
      categoria: "Compras",
      formadepagamento: "Pix",
      observação: "",
   })

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

   // função para trocar as infos

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

            <div className="FDC-add-editFluxo-divs">
               <label htmlFor="CATEGORIA">Categoria:</label>
               <select
                  id="CATEGORIA"
                  value={form.categoria}
                  onChange={(evt) => {
                     handlechanger("categoria", evt.target.value)
                  }}
               >
                  <option value="Despesas Fixas" title="Corte de cabelo , Parcela do curso ...">
                     Despesas Fixas
                  </option>
                  <option value="Assinaturas" title="Google fotos, plano vivo , IPTV">
                     Assinaturas
                  </option>
                  <option value="Compras">Compras</option>
                  <option value="Locomoção" title="99 , gasolina , seguro da moto/carro ...">
                     Locomoção
                  </option>
                  <option value="Esporte" title="Corridas ,  manutenção da bike ...">
                     Esporte
                  </option>
                  <option value="Saúde">Saúde</option>
                  <option value="Alimentação">Alimentação</option>
                  <option value="Lazer">Lazer</option>
               </select>
            </div>

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
               </select>
            </div>

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
