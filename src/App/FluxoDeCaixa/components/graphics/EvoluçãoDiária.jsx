import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Filler } from "chart.js"
import { Line } from "react-chartjs-2"
import { useMemo } from "react"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Filler)

export default function FluxoAcumulado({ dados }) {
   const { labels, valores, segmentColors } = useMemo(() => {
      // Agrupar por dia
      const agrupado = {}

      dados.forEach((item) => {
         const dia = item.data
         const valor = Number(item.valor)
         const tipo = item.tipo

         if (!agrupado[dia]) agrupado[dia] = 0

         if (tipo === "Entrada") agrupado[dia] += valor
         else if (tipo === "Saída") agrupado[dia] -= valor
      })

      // Ordenar dias
      const ordenar = Object.entries(agrupado).sort((a, b) => new Date(a[0]) - new Date(b[0]))

      const labels = ordenar.map(([d]) => d)

      // Criar curva acumulada
      let acumulado = 0
      const valores = ordenar.map(([_, v]) => {
         acumulado += v
         return acumulado
      })

      // Cores dinâmicas entre pontos
      const segmentColors = (ctx) => {
         const i = ctx.p0DataIndex
         const subiu = valores[i + 1] > valores[i]
         return subiu ? "#22c55e" : "#ef4444" // verde / vermelho
      }

      return { labels, valores, segmentColors }
   }, [dados])

   const chartData = {
      labels,
      datasets: [
         {
            label: "Fluxo Acumulado",
            data: valores,
            borderWidth: 2,
            pointRadius: 0,
            fill: false,
            segment: {
               borderColor: segmentColors,
            },
         },
      ],
   }

   const options = {
      responsive: true,
      tension: 0.3,
      interaction: {
         mode: "index",
         intersect: false,
      },
      plugins: {
         legend: { display: false },
      },
   }

   return (
      <div className=" FDC-Gráfico-principal">
         <Line data={chartData} options={options} style={{ width: "100vw " }} />
      </div>
   )
}
