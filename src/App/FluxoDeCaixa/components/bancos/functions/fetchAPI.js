export async function getBancos(http) {
   const response = await fetch(http + "/bancos/look", {
      method: "get",
      credentials: "include",
   })
   const res = await response.json()
   return res
}

export async function addBanco(http, form) {
   const response = await fetch(http + "/bancos/add", {
      method: "post",
      headers: {
         "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(form),
   })
   const res = await response.json()
}

export async function lancamento(http, e) {
   const response = await fetch(http + "/bancos/lancamento", {
      method: "post",
      headers: {
         "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(e),
   })
   const res = await response.json()
}
