// Dados iniciais
const initialItems = ["Despesas fixas", "Compras", "Lazer", "Locomoção", "Alimentação", "Assinatura", "Esporte", "Saúde", "investimento"]

// Função para carregar ou criar os itens do usuário
export function loadUserItems() {
   if (!localStorage.getItem("Categorias")) {
      localStorage.setItem("Categoria", initialItems)
   }
}

// Função para adicionar item
export function addItem(item) {
   const array = localStorage.getItem("Categoria").split(",")
   array.push(item)
   localStorage.setItem("Categoria", array)
}

// Função para remover item
export function removeItem(item) {
   const newArray = []
   const array = localStorage.getItem("Categoria").split(",")
   array.map((e, p) => {
      if (e !== item) {
         newArray.push(e)
      }
   })
   localStorage.setItem("Categoria", newArray)
}
