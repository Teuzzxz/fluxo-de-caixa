export default function Deletefluxo(element, http, reloading) {
  fetch(http + "/deletefluxo", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(element),
  }).then(async () => {
    reloading()
  })
}
