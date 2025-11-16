export default function Maiorgasto(dados) {
  const valor = dados
    .filter((e) => e.tipo === "Saída")
    .reduce((max, atual) => {
      return Number(atual.valor) > max ? Number(atual.valor) : max
    }, 0)

  return valor
}
