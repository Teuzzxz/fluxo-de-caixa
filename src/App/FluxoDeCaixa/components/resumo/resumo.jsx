import Entradas from "./functions/resumoEntradas.js"
import Saídas from "./functions/resumoSaídas.js"
import Maiorgasto from "./functions/resumoMaiorgasto.js"
import Categorias from "./functions/resumoCategorias.js"

import Styles from "./resumo.module.css"

export default function Resumo({ dados }) {
   return (
      <>
         <div className={Styles.container}>
            <h1>RESUMO</h1>
            <h2>
               💰 Entradas: <span> {parseFloat(Entradas(dados)).toFixed(2) || 0}</span>
            </h2>
            <h2>
               💸 Saídas: <span> {parseFloat(Saídas(dados)).toFixed(2) || 0}</span>
            </h2>
            <h2>
               🧾 Saldo: <span> {parseFloat(Entradas(dados) - Saídas(dados)).toFixed(2) || 0}</span>
            </h2>
            <h2>
               📅 Despesas médias diárias: {""}
               <span> {parseFloat(Saídas(dados) / 30).toFixed(2) || 0}</span>
            </h2>
            <h2>
               💥 Maior gasto: {""}
               <span> {parseFloat(Maiorgasto(dados)).toFixed(2) || 0}</span>
            </h2>
            {/* <h2>
               📊 Gasto por categoria:
               <span style={{ textAlign: "center" }}>
                  {Categorias(dados) && Categorias(dados).length > 0 ? (
                     Categorias(dados).map((e, i) => (
                        <h4 key={i} style={{ fontWeight: "lighter" }}>
                           {e.categoria}: <span> {parseFloat(e.total).toFixed(2)}</span>
                        </h4>
                     ))
                  ) : (
                     <p></p>
                  )}
               </span>
            </h2> */}
         </div>
      </>
   )
}
