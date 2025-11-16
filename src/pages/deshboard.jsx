// React e hooks
import { useContext, useEffect, useState } from "react"

// Context
import { UserContext } from "../context/Usercontext"

// Componentes do fluxo
import AddFluxo from "./components/addfluxo"
import Editfluxo from "./components/editfluxo"
import Deletefluxo from "./components/deletefluxo"

// Componentes de resumo
import Entradas from "./components/resumoEntradas"
import Saídas from "./components/resumoSaídas"
import Maiorgasto from "./components/resumoMaiorgasto"
import Categorias from "./components/resumoCategorias"
import CategoriaMaisCara from "./components/resumoCategoria+"

// Gráficos
import PizzaSaídas from "./components/graphics/pizzaSaída"
import GraficoResumo from "./components/graphics/SaídaEntradas"
import EvolucaoDiaria from "./components/graphics/EvoluçãoDiária"

// Easter Egg / secreto
import Secret from "./components/secret/secret"

// CSS
import "../style/deshboard.css"

export default function Deshboard() {
  const data = new Date()
  const [date, setdate] = useState(data.toISOString().split("T")[0])
  const [dados, setdados] = useState("")
  const [loading, setloading] = useState(true)
  const { login, setlogin, http, usuario } = useContext(UserContext)
  const [activemodal, setactivemodal] = useState({ screen: "", element: "" })

  const color = (e) => ({
    backgroundColor:
      e.tipo === "Entrada" ? "#4bb25a" : "rgba(255, 1, 1, 0.591)",
  })
  const getfluxo = () => {
    fetch(http + "/getfluxo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ date, usuario }),
    })
      .then(async (res) => res.json())
      .then(async (res) => {
        setdados(res)

        setloading(false)
      })
  }

  useEffect(() => {
    getfluxo()
  }, [date])

  const reloading = async () => {
    setloading(true)
    getfluxo()
  }

  const mudarMes = (proximo) => {
    const [ano, mes, dia] = date.split("-").map(Number)
    const novaData = new Date(ano, mes - 1, dia)
    novaData.setMonth(novaData.getMonth() + (proximo ? 1 : -1))
    const anoNovo = novaData.getFullYear()
    const mesNovo = String(novaData.getMonth() + 1).padStart(2, "0")
    const diaNovo = String(novaData.getDate()).padStart(2, "0")

    setdate(`${anoNovo}-${mesNovo}-${diaNovo}`)
  }

  if (loading) {
    return <h1>Carregando</h1>
  } else {
    return (
      <>
        <Secret />
        {/* LISTA DOS FLUXOS */}
        <div>
          <header>
            <button
              onClick={() => {
                setlogin(false)
              }}
            >
              Logout
            </button>
          </header>

          <div className="deshbord-div-botoes-mes">
            <button
              className="deshbord-button"
              onClick={async () => {
                mudarMes(false)
              }}
            >
              ⬅️
            </button>
            <input
              className="deshbord-data-select"
              type="date"
              value={date}
              onChange={(evt) => {
                setdate(evt.target.value)
              }}
            />
            <button
              className="deshbord-button"
              onClick={async () => {
                mudarMes(true)
                reloading()
              }}
            >
              ➡️
            </button>
            <button
              className="deshbord-button-add-rec"
              onClick={() => {
                setactivemodal((prev) => ({ ...prev, screen: "new" }))
              }}
            >
              Adicionar fluxo ➕
            </button>
            <button
              className="deshbord-button-add-rec"
              onClick={() => {
                setloading(false)
                getfluxo()
              }}
            >
              Recarregar
            </button>
          </div>
          {/* -----------------------------------------------LISTA---------------------------------------------------- */}
          <div className="deshboard-lista-resumo">
            <div className="deshboard-div-lista-fluxo-grid">
              <div className="deshboard-div-lista-fluxo">
                <h1>data</h1>
                <h1>tipo</h1>
                <h1>valor</h1>
                <h1>categoria</h1>
                <h1>descrição</h1>
                <h1>Forma de pagamento</h1>
                <h1>tipo</h1>
                <h1>Observações</h1>
                <div></div>
                <div></div>
              </div>
              {dados.map((e, i) => (
                <div key={e.id || i} className="deshboard-div-lista-fluxo">
                  <h1>{e.data}</h1>
                  <h1>{e.tipo}</h1>
                  <h1>{e.valor}</h1>
                  <h1>{e.categoria}</h1>
                  <h1>{e.descrição}</h1>
                  <h1>{e.formadepagamento}</h1>
                  <h1 style={color(e)}>{e.tipo}</h1>
                  <h1>{e.observação}</h1>
                  <div className="deshboard-div-button">
                    <button
                      className="deshbord-button-del-edit"
                      onClick={() => {
                        setactivemodal((prev) => ({
                          element: e,
                          screen: "edit",
                        }))
                      }}
                    >
                      ✏️
                    </button>
                  </div>
                  <div className="deshboard-div-button">
                    <button
                      className="deshbord-button-del-edit"
                      onClick={() => {
                        Deletefluxo(e, http, reloading)
                      }}
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* ------------------------------------------------RESUMOS--------------------------------------------------- */}
            <div className="deshboard-resumo">
              <h1>RESUMO</h1>
              <h2>
                💰 Entradas: R$ <span>{Entradas(dados) || 0}</span>
              </h2>
              <h2>
                💸 Saídas: R$ <span>{Saídas(dados) || 0}</span>
              </h2>
              <h2>
                🧾 Saldo: R$ <span>{Entradas(dados) - Saídas(dados) || 0}</span>
              </h2>
              <h2>
                📅 Despesas médias diárias:
                <span>R$ {parseInt(Saídas(dados) / 30) || 0}</span>
              </h2>
              <h2>
                💥 Maior gasto:
                <span>R$ {Maiorgasto(dados) || 0}</span>
              </h2>
              <h2>
                📊 Gasto por categoria:
                <span>
                  {Categorias(dados) && Categorias(dados).length > 0 ? (
                    Categorias(dados).map((e, i) => (
                      <p key={i}>
                        R$ {e.categoria}: {e.total}
                      </p>
                    ))
                  ) : (
                    <p></p>
                  )}
                </span>
              </h2>
              <h2>
                🏷️ Categoria Mais Cara :
                <p>
                  {CategoriaMaisCara(dados)
                    ? `${CategoriaMaisCara(dados).categoria}  ${
                        CategoriaMaisCara(dados).total
                      }`
                    : ""}
                </p>
              </h2>
            </div>
          </div>
        </div>
        {/* TELA DE ADICIONAR NOVO FLUXO E DE EDITAR */}
        {activemodal.screen === "new" && (
          <AddFluxo
            onClose={() => {
              setactivemodal((prev) => ({ ...prev, screen: "" }))
            }}
            reload={reloading}
          />
        )}
        {activemodal.screen === "edit" && (
          <Editfluxo
            onClose={() => {
              setactivemodal((prev) => ({ ...prev, screen: "" }))
            }}
            element={activemodal.element}
            reload={reloading}
          />
        )}
        {/* ----------------------------------------------GRAFICOS----------------------------------------------------- */}
        <PizzaSaídas dados={dados} />
        {/* <GraficoResumo dados={dados} />
        <EvolucaoDiaria dados={dados} /> */}
      </>
    )
  }
}
