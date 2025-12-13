export default async function getfluxo(http, data) {
   try {
      const response = await fetch(http + "/fluxo/look", {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         credentials: "include",
         body: JSON.stringify({ data }),
      })

      const res = await response.json()

      return res.result
   } catch (error) {
      console.error(error)
   }
}
