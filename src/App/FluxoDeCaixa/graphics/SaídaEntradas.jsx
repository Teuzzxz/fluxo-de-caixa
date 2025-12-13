import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts"

export default function GraficoResumo({ dados }) {
  // Soma total das entradas e saídas
  const totalEntradas = dados
    .filter((e) => e.tipo === "Entrada")
    .reduce((acc, e) => acc + Number(e.valor), 0)

  const totalSaidas = dados
    .filter((e) => e.tipo === "Saída")
    .reduce((acc, e) => acc + Number(e.valor), 0)

  const data = [
    { name: "Entradas", valor: totalEntradas },
    { name: "Saídas", valor: totalSaidas },
  ]

  return (
    <div className="Grafico">
      <BarChart width={400} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="valor" fill="#8f9796ff" />
      </BarChart>
    </div>
  )
}
