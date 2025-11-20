export default function Categorias(dados) {
  const saidas = dados.filter((e) => e.tipo === "Saída")
  const categorias = {}
  saidas.forEach((item) => {
    const cat = item.categoria
    const valor = Number(item.valor)
    categorias[cat] = (categorias[cat] || 0) + valor
  })
  const categoriasArray = Object.entries(categorias).map(
    ([categoria, total]) => ({
      categoria,
      total,
    })
  )
  return categoriasArray || "nenhuma"
}
