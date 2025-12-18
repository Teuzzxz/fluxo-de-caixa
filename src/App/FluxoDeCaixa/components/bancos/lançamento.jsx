export default function Laçamento({ onClose, banco }) {
   console.log(banco)
   return (
      <>
         <div>
            <div>
               <h1>novo lançamento</h1>
               <button
                  onClick={() => {
                     onClose()
                  }}
               >
                  X
               </button>
            </div>
         </div>
      </>
   )
}
