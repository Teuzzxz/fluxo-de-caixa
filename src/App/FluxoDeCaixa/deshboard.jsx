// React e hooks
import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

// Contexto
import { UserContext } from "../../context/Usercontext"

// Componentes pricipal
import Header from "./header.jsx"

// Componentes do fluxo
import AddFluxo from "./components/addfluxo.jsx"
import Editfluxo from "./components/editfluxo.jsx"

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
   // Contexto
   const { http } = useContext(UserContext)

   const dataCompleta = new Date()
   const [data, setdata] = useState(dataCompleta.toISOString().split("T")[0])
   const [dados, setdados] = useState([])
   const [callmenssager, setcallmenssager] = useState([false, ""])

   // Outras screens
   const [activemodal, setactivemodal] = useState({ screen: "", element: "" })

   const getfluxo = () => {
      const FetchAPI = async () => {
         const response = await fetch(http + "/fluxo/look", {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ data }),
         })
         const res = await response.json()
         setdados(res.result)
      }
      FetchAPI()
   }

   useEffect(() => {
      getfluxo()
   }, [data])

   const mudarMes = (proximo) => {
      const [ano, mes, dia] = data.split("-").map(Number)
      const novaData = new Date(ano, mes - 1, dia)
      novaData.setMonth(novaData.getMonth() + (proximo ? 1 : -1))
      const anoNovo = novaData.getFullYear()
      const mesNovo = String(novaData.getMonth() + 1).padStart(2, "0")
      const diaNovo = String(novaData.getDate()).padStart(2, "0")

      setdata(`${anoNovo}-${mesNovo}-${diaNovo}`)
   }

   const color = (e) => ({
      backgroundColor: e.tipo === "Entrada" ? "#4bb25a" : "rgba(255, 1, 1, 0.591)",
   })

   return (
      <>
         <Header />

         <div className="FDC-Navbar">
            <div className="FDC-Navbar-SetMes">
               <button
                  onClick={async () => {
                     mudarMes(false)
                  }}
               >
                  ⬅️
               </button>
               <input
                  type="date"
                  value={data}
                  onChange={(evt) => {
                     setdata(evt.target.value)
                  }}
               />
               <button
                  onClick={async () => {
                     mudarMes(true)
                  }}
               >
                  ➡️
               </button>
            </div>

            <button
               className="FDC-Navbar-Button"
               onClick={() => {
                  setactivemodal((prev) => ({ ...prev, screen: "new" }))
               }}
            >
               Adicionar fluxo
            </button>
            <button
               className="FDC-Navbar-Button"
               onClick={() => {
                  getfluxo()
               }}
            >
               Recarregar
            </button>
         </div>

         {/* -------------------------------------------------------------- */}

         <div className="FDC-Lista-Resumo">
            {/* -------------------------------------------------------------- */}
            {/* -------------------------------------------------------------- */}
            {/* -------------------LISTA----------------------------- */}
            {/* -------------------------------------------------------------- */}
            {/* -------------------------------------------------------------- */}
            <div className="FDC-Lista">
               <div className="FDC-Lista-Grid">
                  <div className="FDC-Lista-Titles">
                     <div>
                        <h1>data</h1>
                     </div>
                     <div>
                        <h1>tipo</h1>
                     </div>
                     <div>
                        <h1>valor</h1>
                     </div>
                     <div>
                        <h1>categoria</h1>
                     </div>
                     <div>
                        <h1>descrição</h1>
                     </div>
                     <div>
                        <h1>F.D pagamento</h1>
                     </div>
                     <div>
                        <h1>Observações</h1>
                     </div>

                     <div></div>
                  </div>
                  {dados.map((e, i) => (
                     <div key={e.id || i} className="FDC-Lista-Titles">
                        <div>
                           <h1>{e.data}</h1>
                        </div>
                        <div style={color(e)}>
                           <h1>{e.tipo}</h1>
                        </div>
                        <div>
                           <h1>{e.valor}</h1>
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

                        <div className="FDC-Lista-button-father">
                           <div className="FDC-Lista-button-father-div">
                              <button
                                 className="FDC-Lista-button-del-edit"
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
                        </div>
                     </div>
                  ))}
               </div>
            </div>

            {/* -------------------------------------------------------------- */}
            {/* -------------------------------------------------------------- */}
            {/* -------------------RESUMO----------------------------- */}
            {/* -------------------------------------------------------------- */}
            {/* -------------------------------------------------------------- */}

            <div className="FDC-resumo">
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

         {/* TELA DE ADICIONAR NOVO FLUXO E DE EDITAR */}
         {activemodal.screen === "new" && (
            <AddFluxo
               onClose={() => {
                  setactivemodal((prev) => ({ ...prev, screen: "" }))
               }}
               reload={getfluxo}
            />
         )}
         {activemodal.screen === "edit" && (
            <Editfluxo
               onClose={() => {
                  setactivemodal((prev) => ({ ...prev, screen: "" }))
               }}
               element={activemodal.element}
               reload={getfluxo}
            />
         )}

         {/* ----------------------------------------------GRAFICOS----------------------------------------------------- */}

         <div className="FDC-Gráficos FDC-Gráfico-principal-div">
            <EvolucaoDiaria dados={dados} />
         </div>

         <div className="FDC-Gráficos-secundários FDC-Gráficos">
            <PizzaSaídas dados={dados} />
            <GraficoResumo dados={dados} />
         </div>

         {/* MENSAGEM  */}

         {callmenssager[0] && <Menssager menssager={callmenssager[1]} />}
      </>
   )
}
