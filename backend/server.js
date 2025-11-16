import express from "express"
import cors from "cors"
import { Low } from "lowdb" // Banco de dados
import { JSONFile } from "lowdb/node" // Banco de dados
import { v4 as uuidv4 } from "uuid" // Criador de ID
import fs from "fs" // Criar pastas

const PORT = 4000
const app = express()

app.use(express.json())

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
)

app.post("/createaccount", async (req, res) => {
  const info = {
    id: uuidv4(),
    ...req.body,
  }

  const adapter = new JSONFile("database/usuarios.json")
  const db = new Low(adapter, { usuarios: [] })
  await db.read()
  db.data.usuarios ||= []

  db.data.usuarios.push(info)
  await db.write()

  return res.status(200).json({ message: "Deu certo" })
})

// Rota para fazer login
app.post("/login", async (req, res) => {
  const { user, password } = req.body

  const adapter = new JSONFile("database/usuarios.json")
  const db = new Low(adapter, { usuarios: [] })
  await db.read()
  db.data.usuarios ||= []

  const usuario = db.data.usuarios.find((e) => e.name === user)

  if (!usuario) {
    return res.status(404).json({ message: "Usuário não encontrado!" })
  }

  if (usuario.password !== password) {
    return res.status(404).json({ message: "Senha incorreta" })
  }

  res.status(200).json({ message: "Login realizado com sucesso!" })
})

// Rota para fazer um novo fluxo
app.post("/newfluxo", async (req, res) => {
  const data = req.body.data
  const year = new Date(data).getFullYear()
  const mesNumero = new Date(data).getMonth() + 1
  const mesNome = new Date(data).toLocaleString("pt-BR", { month: "long" })

  const info = {
    id: uuidv4(),
    ...req.body,
  }
  if (info.tipo === "Entrada") {
    info.categoria = ""
  }
  console.log(info.tipo)

  // Cria o diretório automaticamente, se não existir
  const dirPath = `database/fluxo/${year}/${mesNome}`
  fs.mkdirSync(dirPath, { recursive: true })

  //Banco de dados
  const adapter = new JSONFile(`database/fluxo/${year}/${mesNome}/fluxo.json`)
  const db = new Low(adapter, { fluxo: [] })
  await db.read()
  db.data.fluxo ||= []
  db.data.fluxo.push(info)
  await db.write()

  return res.status(200).json({ message: "Fluxo salvo com sucesso!" })
})

app.post("/getfluxo", async (req, res) => {
  try {
    const data = req.body.date
    const year = new Date(data).getFullYear()
    const mesNome = new Date(data).toLocaleString("pt-BR", { month: "long" })

    const adapter = new JSONFile(`database/fluxo/${year}/${mesNome}/fluxo.json`)
    const db = new Low(adapter, { fluxo: [] })
    await db.read()

    db.data ||= { fluxo: [] }

    return res.status(200).json(db.data.fluxo)
  } catch (err) {
    console.error("Erro ao ler fluxo:", err)
    return res.status(500).json({ erro: "Falha ao obter dados do fluxo" })
  }
})

// Rota para editar o fluxo
app.post("/editarfluxo", async (req, res) => {
  try {
    const info = req.body
    const data = req.body.data
    const id = req.body.id
    const year = new Date(data).getFullYear()
    const mesNome = new Date(data).toLocaleString("pt-BR", { month: "long" })

    const adapter = new JSONFile(`database/fluxo/${year}/${mesNome}/fluxo.json`)
    const db = new Low(adapter, { fluxo: [] })
    await db.read()
    db.data.fluxo ||= []

    // Acha o índice do item a ser editado
    const index = db.data.fluxo.findIndex((item) => item.id === id)

    if (index === -1) {
      return res.status(404).json({ error: "Item não encontrado" })
    }

    //Se for entrada, tira a categoria
    if (info.tipo === "Entrada") {
      info.categoria = ""
    }
    console.log(info.tipo)

    // Atualiza os dados mantendo o mesmo id
    db.data.fluxo[index] = { ...db.data.fluxo[index], ...info }

    await db.write()

    return res.status(200).json({ message: "Fluxo atualizado com sucesso!" })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: "Erro ao editar o fluxo" })
  }
})

// Rota para deletar fluxo
app.post("/deletefluxo", async (req, res) => {
  try {
    const data = req.body.data
    const id = req.body.id
    const year = new Date(data).getFullYear()
    const mesNome = new Date(data).toLocaleString("pt-BR", { month: "long" })

    const adapter = new JSONFile(`database/fluxo/${year}/${mesNome}/fluxo.json`)
    const db = new Low(adapter, { fluxo: [] })
    await db.read()
    db.data.fluxo ||= []

    // Filtra e remove o item com o ID correspondente
    const fluxoAntes = db.data.fluxo.length
    db.data.fluxo = db.data.fluxo.filter((item) => item.id !== id)

    console.log(req.body)
    // Verifica se algo foi realmente removido
    if (db.data.fluxo.length === fluxoAntes) {
      return res.status(404).json({ error: "Item não encontrado" })
    }

    await db.write()

    return res.status(200).json({ message: "Fluxo apagado com sucesso!" })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: "Erro ao apagar o fluxo" })
  }
})

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`))
process.stdin.resume()
