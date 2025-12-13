import Styles from "./mensagem.module.css"

export default function Menssager({ menssager }) {
   return (
      <>
         <div className={Styles.container}>
            <h1>{menssager}</h1>
         </div>
      </>
   )
}
