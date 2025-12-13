// React e hooks
import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

// Contexto
import { UserContext } from "../../../context/Usercontext.jsx"

// Componentes
import Menulateral from "../components/menu lateral/Menu.jsx"
import Header from "../components/header/header.jsx"
import Table from "../components/tabela/Tabela.jsx"
import Resumo from "../components/resumo/resumo.jsx"
import Datas from "../components/datas/Datas.jsx"

// Componentes do fluxo
import AddFluxo from "../components/fluxo/addFluxo/addfluxo.jsx"
import Editfluxo from "../components/fluxo/editFluxo/editfluxo.jsx"

// Gráficos
import PizzaSaídas from "../graphics/pizzaSaída.jsx"
import GraficoResumo from "../graphics/SaídaEntradas.jsx"
import EvolucaoDiaria from "../graphics/EvoluçãoDiária.jsx"

// Mensager
import Menssager from "../../../components globais/menssager.jsx"

// Funções
import getfluxo from "./functions/getFluxo.js"

// CSS
import "./deshboard.css"

export default function Deshboard() {
   // Contexto
   const { http, fluxoAtual, setfluxoAtual } = useContext(UserContext)

   // Datas
   const dataCompleta = new Date()
   const [data, setdata] = useState(dataCompleta.toISOString().split("T")[0])

   // Menssagem
   const [callmenssager, setcallmenssager] = useState([false, ""])

   // Outras screens
   const [activemodal, setactivemodal] = useState({ screen: "", element: "" })

   // Para abrir o Menu lateral
   const [isOpen, setisOpen] = useState(false)
   const handleOpen = () => {
      setisOpen(!isOpen)
   }

   // Recarregar os fluxos
   const carregarDados = async () => {
      const resultado = await getfluxo(http, data)
      if (resultado) {
         setfluxoAtual(resultado)
      }
   }
   useEffect(() => {
      carregarDados()
   }, [data])

   return (
      <>
         <Menulateral isOpen={isOpen} handleOpen={handleOpen} setactivemodal={setactivemodal} />
         <Header handleOpen={handleOpen} />
         <Datas data={data} setdata={setdata} reload={carregarDados} />
         <Table dados={fluxoAtual} setactivemodal={setactivemodal} />
         <Resumo dados={fluxoAtual} />

         {/* TELA DE ADICIONAR NOVO FLUXO E DE EDITAR */}
         {activemodal.screen === "new" && (
            <AddFluxo
               onClose={() => {
                  setactivemodal((prev) => ({ ...prev, screen: "" }))
               }}
               msg={setcallmenssager}
               reload={carregarDados}
            />
         )}
         {activemodal.screen === "edit" && (
            <Editfluxo
               onClose={() => {
                  setactivemodal((prev) => ({ ...prev, screen: "" }))
               }}
               element={activemodal.element}
               reload={carregarDados}
               msg={setcallmenssager}
            />
         )}

         {/* <div className="FDC-Grafico-Banco">
            <EvolucaoDiaria dados={dados} />

            <div className="FDC-Banco"></div>
         </div>

         <div className="FDC-Gráficos-secundários FDC-Gráficos">
            <PizzaSaídas dados={dados} />
            <GraficoResumo dados={dados} />
         </div> */}

         {callmenssager[0] && <Menssager menssager={callmenssager[1]} />}
      </>
   )
}
