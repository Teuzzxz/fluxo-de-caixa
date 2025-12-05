function mmssToSeconds(mmss) {
   const [m, s] = mmss.split(":").map(Number)
   return m * 60 + s
}

export function calcularNotaTreino({
   paceReal, // "5:13"
   fcMedia,
   temperatura,
   umidade,
   elevacao,
   vento,
}) {
   const pace = mmssToSeconds(paceReal)

   // 1 — Score do pace
   let scorePace = 100 * (1 / (pace / 300))
   scorePace = Math.max(0, Math.min(100, scorePace))

   // 2 — Score do esforço
   let scoreEsforco = 100 * (140 / fcMedia)
   scoreEsforco = Math.max(0, Math.min(100, scoreEsforco))

   // 3 — Temperatura
   let scoreTemp = 100 - Math.abs(temperatura - 10) * 3
   scoreTemp = Math.max(0, Math.min(100, scoreTemp))

   // 4 — Umidade
   let scoreUmid = 100 - Math.max(0, umidade - 55) * 0.8
   scoreUmid = Math.max(0, Math.min(100, scoreUmid))

   // 5 — Elevação (benefício)
   let scoreElev = Math.min(100, 50 + elevacao / 2)

   // 6 — Vento
   let scoreVento = 100 - vento * 2.5
   scoreVento = Math.max(0, Math.min(100, scoreVento))

   // Peso dos fatores
   const nota = scorePace * 0.45 + scoreEsforco * 0.3 + scoreTemp * 0.07 + scoreUmid * 0.07 + scoreElev * 0.06 + scoreVento * 0.05

   // normalizar pra 20–100
   const final = 20 + (nota / 100) * 80

   return Math.round(final) - 50
}

// const nota = calcularNotaTreino({
//    paceReal: "6:13",
//    fcMedia: 142,
//    temperatura: 21,
//    umidade: 56,
//    elevacao: 28,
//    vento: 5,
// })
