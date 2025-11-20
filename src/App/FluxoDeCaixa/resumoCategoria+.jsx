export default function CategoriaMaisCara(dados) {
  const saidas = dados.filter((e) => e.tipo === "Saída")
  const categorias = {}

  // Soma o valor total de cada categoria
  saidas.forEach((item) => {
    const cat = item.categoria
    const valor = Number(item.valor)
    categorias[cat] = (categorias[cat] || 0) + valor
  })

  // Converte o objeto em array [{ categoria, total }]
  const categoriasArray = Object.entries(categorias).map(
    ([categoria, total]) => ({
      categoria,
      total,
    })
  )

  if (categoriasArray.length === 0) {
    return null
  }

  // Encontra a categoria com maior gasto
  const maisCara = categoriasArray.reduce((max, atual) =>
    atual.total > max.total ? atual : max
  )

  return maisCara
}
