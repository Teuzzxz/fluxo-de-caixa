export default async function Deletefluxo(element, http) {
   try {
      const response = await fetch(http + "/fluxo/del", {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         credentials: "include",
         body: JSON.stringify(element),
      })

      const res = await response.json()
      return { ok: true, menssager: res.menssager }
   } catch (err) {
      console.error(err)
      return { ok: false }
   }
}
