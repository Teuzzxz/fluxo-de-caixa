import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

export default function EvolucaoDiaria({ dados }) {
  const agrupadoPorDia = {}

  // 🔹 Soma entradas e saídas por data
  dados.forEach((item) => {
    const dia = item.data
    const valor = Number(item.valor)
    const tipo = item.tipo

    if (!agrupadoPorDia[dia]) agrupadoPorDia[dia] = { entradas: 0, saidas: 0 }

    if (tipo === "Entrada") agrupadoPorDia[dia].entradas += valor
    else if (tipo === "Saída") agrupadoPorDia[dia].saidas += valor
  })

  // 🔹 Converte pra array e ordena
  const dadosPorDia = Object.entries(agrupadoPorDia)
    .map(([data, valores]) => ({
      data,
      ...valores,
    }))
    .sort((a, b) => new Date(a.data) - new Date(b.data))

  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">
        📉 Evolução Diária (Entradas e Saídas)
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={dadosPorDia}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="data" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="entradas" stroke="#22c55e" />
          <Line type="monotone" dataKey="saidas" stroke="#ef4444" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
