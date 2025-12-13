import { useState } from "react"
import { Navigate, useNavigate } from "react-router-dom"
import { calcularNotaTreino } from "../components/CalcularNota.js"

export default function Treinos() {
   const navigate = useNavigate()
   const [dados, setdados] = useState({
      paceReal: "",
      fcMedia: "",
      temperatura: "",
      umidade: "",
      elevacao: "",
      vento: "",
   })

   const [result, setresult] = useState(0)
   return (
      <>
         <button
            onClick={() => {
               navigate("/selectApp")
            }}
         >
            Voltar
         </button>
         <input
            type="text"
            placeholder="Pace Real"
            value={dados.paceReal}
            onChange={(e) => {
               setdados((prev) => ({ ...prev, paceReal: e.target.value }))
            }}
         />
         <input
            type="text"
            placeholder="FcMédia"
            value={dados.fcMedia}
            onChange={(e) => {
               setdados((prev) => ({ ...prev, fcMedia: e.target.value }))
            }}
         />
         <input
            type="Number"
            placeholder="Temperatura"
            value={dados.temperatura}
            onChange={(e) => {
               setdados((prev) => ({ ...prev, temperatura: e.target.value }))
            }}
         />
         <input
            type="Number"
            placeholder="Umidade"
            value={dados.umidade}
            onChange={(e) => {
               setdados((prev) => ({ ...prev, umidade: e.target.value }))
            }}
         />
         <input
            type="Number"
            placeholder="Elevação"
            value={dados.elevacao}
            onChange={(e) => {
               setdados((prev) => ({ ...prev, elevacao: e.target.value }))
            }}
         />
         <button
            onClick={() => {
               setresult(calcularNotaTreino(dados))
            }}
         >
            Calcular
         </button>
         <p>Resultado : {result}</p>
      </>
   )
}
