export default function Saídas(dados) {
  const valor = dados
    .filter((e) => e.tipo === "Saída")
    .reduce((acc, e) => acc + Number(e.valor), 0)
  return valor
}
