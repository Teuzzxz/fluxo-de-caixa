export default function Entradas(dados) {
   const valor = dados.filter((e) => e.tipo === "Entrada").reduce((acc, e) => acc + Number(e.valor), 0)
   return valor
}
