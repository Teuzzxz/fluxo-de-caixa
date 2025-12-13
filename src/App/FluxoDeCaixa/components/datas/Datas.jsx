import Styles from "./datas.module.css"

export default function Datas({ data, setdata, reload }) {
   const mudarMes = (proximo) => {
      const [ano, mes, dia] = data.split("-").map(Number)
      const novaData = new Date(ano, mes - 1, dia)
      novaData.setMonth(novaData.getMonth() + (proximo ? 1 : -1))
      const anoNovo = novaData.getFullYear()
      const mesNovo = String(novaData.getMonth() + 1).padStart(2, "0")
      const diaNovo = String(novaData.getDate()).padStart(2, "0")

      setdata(`${anoNovo}-${mesNovo}-${diaNovo}`)
   }

   return (
      <div className={Styles.container}>
         <div className={Styles.action}>
            <button
               className={Styles.button}
               onClick={async () => {
                  mudarMes(false)
               }}
            >
               ◀️
            </button>
            <input
               className={Styles.input}
               type="date"
               value={data}
               onChange={(evt) => {
                  setdata(evt.target.value)
               }}
            />
            <button
               className={Styles.button}
               onClick={async () => {
                  mudarMes(true)
               }}
            >
               ▶️
            </button>
         </div>

         <button
            className={Styles.button_reload}
            onClick={() => {
               reload()
            }}
         >
            ↻
         </button>
      </div>
   )
}
