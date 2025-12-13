export async function addNewFluxo(http, form, setform, msg, reload) {
   if (form.valor === "" || form.data === "") {
      msg([true, "Faltam valores"])
      setTimeout(() => {
         msg([false, ""])
      }, 2000)
      return
   }
   const response = await fetch(http + "/fluxo/add", {
      method: "post",
      headers: {
         "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(form),
   })
   const res = await response.json()

   if (res.ok) {
      reload()
      msg([true, "Fluxo adicionado com sucesso"])
      setTimeout(() => {
         msg(false, "")
      }, 2000)
      setform((prev) => ({
         ...prev,
         tipo: "Saída",
         valor: "",
         descrição: "",
         categoria: "Compras",
         formadepagamento: "Pix",
         observação: "",
      }))
   }
}
export async function editFluxo(http, form, msg, reload, onClose) {
   if (form.valor === "" || form.data === "") {
      msg([true, "Faltam valores"])
      setTimeout(() => {
         msg([false, ""])
      }, 2000)
      return
   }
   const response = await fetch(http + "/fluxo/edit", {
      method: "post",
      headers: {
         "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(form),
   })
   const res = await response.json()

   if (res.ok) {
      reload()
      onClose()
      msg([true, "Fluxo editado com sucesso"])
      setTimeout(() => {
         msg(false, "")
      }, 2000)
   }
}
