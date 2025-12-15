import Styles from "./Tabela.module.css"

export default function Table({ dados, setactivemodal }) {
   const formatMoneyBR = (value) => {
      if (value === null || value === undefined || isNaN(value)) {
         return "0,00"
      }

      return Number(value).toLocaleString("pt-BR", {
         minimumFractionDigits: 2,
         maximumFractionDigits: 2,
      })
   }

   const color = (e) => ({
      backgroundColor: e.tipo === "Entrada" ? "#4bb25a" : "rgba(255, 1, 1, 0.591)",
   })

   return (
      <div className={Styles.container}>
         <div className={Styles.grid}>
            <div className={Styles.titles}>
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
               <div key={e.id || i} className={Styles.titles}>
                  <div>
                     <h1>{e.data}</h1>
                  </div>
                  <div style={color(e)}>
                     <h1>{e.tipo}</h1>
                  </div>
                  <div>
                     <h1>{formatMoneyBR(e.valor)}</h1>
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

                  <div className={Styles.action}>
                     <button
                        onClick={() => {
                           setactivemodal({ element: e, screen: "edit" })
                        }}
                     >
                        ✏️
                     </button>
                  </div>
               </div>
            ))}
         </div>
      </div>
   )
}
