// React e hooks
import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

// Context
import { UserContext } from "../../context/Usercontext.jsx"

// Componentes pricipal
import Header from "./header.jsx"

// Componentes do fluxo
import AddFluxo from "./components/addfluxo.jsx"
import Editfluxo from "./components/editfluxo.jsx"
import Deletefluxo from "./components/deletefluxo.jsx"

// Componentes de resumo
import Entradas from "./components/resumoEntradas.jsx"
import Saídas from "./components/resumoSaídas.jsx"
import Maiorgasto from "./components/resumoMaiorgasto.jsx"
import Categorias from "./components/resumoCategorias.jsx"

// Gráficos
import PizzaSaídas from "./components/graphics/pizzaSaída.jsx"
import GraficoResumo from "./components/graphics/SaídaEntradas.jsx"
import EvolucaoDiaria from "./components/graphics/EvoluçãoDiária.jsx"

// Mensager
import Menssager from "../../components/menssager.jsx"

// CSS
import "../../style/deshboard.css"

export default function Deshboard() {
   const userssesion = sessionStorage.getItem("user")

   const navigate = useNavigate()
   const data = new Date()
   const [date, setdate] = useState(data.toISOString().split("T")[0])
   const [dados, setdados] = useState("")
   const [loading, setloading] = useState(true)
   const { http, usuario } = useContext(UserContext)
   const [activemodal, setactivemodal] = useState({ screen: "", element: "" })
   const [callmenssager, setcallmenssager] = useState([false, ""])

   const color = (e) => ({
      backgroundColor: e.tipo === "Entrada" ? "#4bb25a" : "rgba(255, 1, 1, 0.591)",
   })
   const getfluxo = () => {
      const FetchAPI = async () => {
         const response = await fetch(http + "/fluxo/look", {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ date }),
         })
         const res = await response.json()
         setdados(res.result)
         setloading(false)
      }
      FetchAPI()
   }

   useEffect(() => {
      getfluxo()
   }, [date])

   const reloading = async () => {
      setloading(true)
      getfluxo()
   }

   const mudarMes = (proximo) => {
      const [ano, mes, dia] = date.split("-").map(Number)
      const novaData = new Date(ano, mes - 1, dia)
      novaData.setMonth(novaData.getMonth() + (proximo ? 1 : -1))
      const anoNovo = novaData.getFullYear()
      const mesNovo = String(novaData.getMonth() + 1).padStart(2, "0")
      const diaNovo = String(novaData.getDate()).padStart(2, "0")

      setdate(`${anoNovo}-${mesNovo}-${diaNovo}`)
   }
   if (loading) {
      return <h1>Carregando</h1>
   } else {
      return (
         <>
            {/* LISTA DOS FLUXOS */}
            <div>
               <Header />

               <div className="deshbord-div-botoes-mes">
                  <button
                     className="deshbord-button"
                     onClick={async () => {
                        mudarMes(false)
                     }}
                  >
                     ⬅️
                  </button>
                  <input
                     className="deshbord-data-select"
                     type="date"
                     value={date}
                     onChange={(evt) => {
                        setdate(evt.target.value)
                     }}
                  />
                  <button
                     className="deshbord-button"
                     onClick={async () => {
                        mudarMes(true)
                        reloading()
                     }}
                  >
                     ➡️
                  </button>
                  <button
                     className="deshbord-button-add-rec"
                     onClick={() => {
                        setactivemodal((prev) => ({ ...prev, screen: "new" }))
                     }}
                  >
                     Adicionar fluxo
                  </button>
                  <button
                     className="deshbord-button-add-rec"
                     onClick={() => {
                        setloading(false)
                        getfluxo()
                     }}
                  >
                     Recarregar
                  </button>
               </div>
               {/* -----------------------------------------------LISTA---------------------------------------------------- */}
               <div className="deshboard-lista-resumo">
                  <div className="deshboard-div-lista-fluxo-grid">
                     <div className="deshboard-div-lista-fluxo">
                        <h1>data</h1>
                        <h1>tipo</h1>
                        <h1>valor</h1>
                        <h1>categoria</h1>
                        <h1>descrição</h1>
                        <h1>Forma de pagamento</h1>
                        <h1>Observações</h1>
                        <div></div>
                     </div>
                     {dados.map((e, i) => (
                        <div key={e.id || i} className="deshboard-div-lista-fluxo">
                           <div>
                              <h1>{e.data}</h1>
                           </div>
                           <div style={color(e)}>
                              <h1>{e.tipo}</h1>
                           </div>
                           <div>
                              <h1>
                                 R$: <span>{e.valor}</span>
                              </h1>
                           </div>
                           <div>
                              <h1>{e.categoria}</h1>
                           </div>
                           <div>
                              <h1>{e.descrição}</h1>
                           </div>
                           <div>
                              <h1>{e.formadepagamento}</h1>
                           </div>
                           <div>
                              <h1>{e.observação}</h1>
                           </div>

                           <div className="deshboard-div-button-father">
                              <div className="deshboard-div-button">
                                 <button
                                    className="deshbord-button-del-edit"
                                    onClick={() => {
                                       setactivemodal((prev) => ({
                                          element: e,
                                          screen: "edit",
                                       }))
                                    }}
                                 >
                                    ✏️
                                 </button>
                              </div>

                              <div className="deshboard-div-button"></div>
                           </div>
                        </div>
                     ))}
                  </div>

                  {/* ------------------------------------------------RESUMOS--------------------------------------------------- */}
                  <div className="deshboard-resumo">
                     <h1>RESUMO</h1>
                     <h2>
                        💰 Entradas: <span> {Entradas(dados) || 0}</span>
                     </h2>
                     <h2>
                        💸 Saídas: <span> {Saídas(dados) || 0}</span>
                     </h2>
                     <h2>
                        🧾 Saldo: <span> {Entradas(dados) - Saídas(dados) || 0}</span>
                     </h2>
                     <h2>
                        📅 Despesas médias diárias: {""}
                        <span> {parseInt(Saídas(dados) / 30) || 0}</span>
                     </h2>
                     <h2>
                        💥 Maior gasto: {""}
                        <span> {Maiorgasto(dados) || 0}</span>
                     </h2>
                     <h2>
                        📊 Gasto por categoria:
                        <span style={{ textAlign: "center" }}>
                           {Categorias(dados) && Categorias(dados).length > 0 ? (
                              Categorias(dados).map((e, i) => (
                                 <h4 key={i} style={{ fontWeight: "lighter" }}>
                                    {e.categoria}: <span> {e.total}</span>
                                 </h4>
                              ))
                           ) : (
                              <p></p>
                           )}
                        </span>
                     </h2>
                  </div>
               </div>
            </div>
            {/* TELA DE ADICIONAR NOVO FLUXO E DE EDITAR */}
            {activemodal.screen === "new" && (
               <AddFluxo
                  onClose={() => {
                     setactivemodal((prev) => ({ ...prev, screen: "" }))
                  }}
                  reload={reloading}
               />
            )}
            {activemodal.screen === "edit" && (
               <Editfluxo
                  onClose={() => {
                     setactivemodal((prev) => ({ ...prev, screen: "" }))
                  }}
                  element={activemodal.element}
                  reload={reloading}
               />
            )}
            {/* ----------------------------------------------GRAFICOS----------------------------------------------------- */}
            <div className="Graficos">
               <PizzaSaídas dados={dados} />
               <GraficoResumo dados={dados} />
            </div>

            <EvolucaoDiaria dados={dados} />
            {callmenssager[0] && <Menssager menssager={callmenssager[1]} />}
         </>
      )
   }
}
