export async function getBancos(http) {
   const response = await fetch(http + "/bancos/look", {
      method: "get",
      credentials: "include",
   })
   const res = await response.json()
   console.log(res)
}

export async function addBanco(http, banco) {
   const response = await fetch(http + "/bancos/add", {
      method: "post",
      headers: {
         "Content-Type": "application/json",
      },
      credentials: "include",
      body: banco,
   })
   const res = await response.json()
   console.log(res)
}
