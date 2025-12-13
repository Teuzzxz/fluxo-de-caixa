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
               💰 Entradas: <span> {parseInt(Entradas(dados)) || 0}</span>
            </h2>
            <h2>
               💸 Saídas: <span> {parseInt(Saídas(dados)) || 0}</span>
            </h2>
            <h2>
               🧾 Saldo: <span> {parseInt(Entradas(dados) - Saídas(dados)) || 0}</span>
            </h2>
            <h2>
               📅 Despesas médias diárias: {""}
               <span> {parseInt(parseInt(Saídas(dados) / 30)) || 0}</span>
            </h2>
            <h2>
               💥 Maior gasto: {""}
               <span> {parseInt(Maiorgasto(dados)) || 0}</span>
            </h2>
            <h2>
               📊 Gasto por categoria:
               <span style={{ textAlign: "center" }}>
                  {Categorias(dados) && Categorias(dados).length > 0 ? (
                     Categorias(dados).map((e, i) => (
                        <h4 key={i} style={{ fontWeight: "lighter" }}>
                           {e.categoria}: <span> {parseInt(e.total)}</span>
                        </h4>
                     ))
                  ) : (
                     <p></p>
                  )}
               </span>
            </h2>
         </div>
      </>
   )
}
