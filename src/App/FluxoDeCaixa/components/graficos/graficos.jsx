import Styles from "./graficos.module.css"
import PizzaSaídas from "./graphics/pizzaSaída.jsx"
import FluxoAcumulado from "./graphics/EvoluçãoDiária.jsx"

export default function Graficos({ onClose, dados }) {
   return (
      <>
         <div className={Styles.container}>
            <div className={Styles.title}>
               <h1>Graficos</h1>
               <button
                  onClick={() => {
                     onClose()
                  }}
               >
                  x
               </button>
            </div>
            <div className={Styles.graficos}>
               <div>
                  {" "}
                  <PizzaSaídas dados={dados} />
               </div>

               <div className={Styles.grafico_2}>
                  <FluxoAcumulado dados={dados} />
               </div>
            </div>
         </div>
      </>
   )
}
