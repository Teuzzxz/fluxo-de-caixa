import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts"

export default function PizzaSaídas({ dados }) {
   // Pega só as saídas
   const saidas = dados.filter((e) => e.tipo === "Saída")

   // Soma os valores por categoria
   const categorias = {}
   saidas.forEach((item) => {
      const categoria = item.categoria ? item.categoria : "Indefinido"
      const valor = parseInt(Number(item.valor))
      categorias[categoria] = (categorias[categoria] || 0) + valor
   })

   // Converte para o formato que o Recharts entende
   const data = Object.entries(categorias).map(([categoria, total]) => ({
      name: categoria,
      value: total,
   }))

   const COLORS = ["#27cd67ff", "rgba(197, 40, 174, 1)", "#2796cdff", "#c2cd27ff", "#a2e217ff", "#638595ff", "red", "yellow", "white", "blue", "porplue"]

   return (
      <PieChart width={400} height={300}>
         <Pie data={data} cx="50%" cy="50%" outerRadius={100} dataKey="value" label>
            {data.map((entry, index) => (
               <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
         </Pie>
         <Tooltip />
         <Legend />
      </PieChart>
   )
}
