import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts"

export default function PizzaSaídas({ dados }) {
  // Pega só as saídas
  const saidas = dados.filter((e) => e.tipo === "Saída")

  // Soma os valores por categoria
  const categorias = {}
  saidas.forEach((item) => {
    const categoria = item.categoria
    const valor = Number(item.valor)
    categorias[categoria] = (categorias[categoria] || 0) + valor
  })

  // Converte para o formato que o Recharts entende
  const data = Object.entries(categorias).map(([categoria, total]) => ({
    name: categoria,
    value: total,
  }))

  const COLORS = ["#ff6b6b", "#feca57", "#1dd1a1", "#54a0ff", "#5f27cd"]

  return (
    <div>
      <h2>🥧 Gastos por Categoria</h2>
      <PieChart width={400} height={300}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={100}
          dataKey="value"
          label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  )
}
