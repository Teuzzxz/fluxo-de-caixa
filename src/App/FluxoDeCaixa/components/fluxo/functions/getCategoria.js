import { loadUserItems } from "../../categoria/functions/categoria"

export default function getCategoria(setCategoria) {
   let array = localStorage.getItem("Categoria")
   if (array) {
      array = array.split(",")
      setCategoria(array)
   } else {
      loadUserItems()
      setCategoria(localStorage.getItem("Categoria").split(","))
   }
}
