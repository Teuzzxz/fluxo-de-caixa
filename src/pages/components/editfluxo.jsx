import { useState, useContext, useEffect } from "react"
import { UserContext } from "../../context/Usercontext"
import Menssager from "./menssager"

export default function Editfluxo({ onClose, element, reload }) {
  const { http } = useContext(UserContext)
  //States das informações abaixo

  const [form, setform] = useState({
    tipo: element.tipo,
    valor: element.valor,
    descrição: element.descrição,
    data: element.data,
    categoria: element.categoria,
    formadepagamento: element.formadepagamento,
    observação: element.observação,
    id: element.id,
  })

  // função para trocar as infos

  const handlechanger = (field, value) => {
    setform((prev) => ({ ...prev, [field]: value }))
  }

  const [callmenssager, setcallmenssager] = useState([false, ""])

  return (
    <>
      <div>
        <h1>Editar Fluxo</h1>
        <button
          onClick={() => {
            onClose()
          }}
        >
          SAIR
        </button>
        <div>
          <p>Tipo / Entrada ou saíada \</p>
          <select
            onChange={(evt) => {
              handlechanger("tipo", evt.target.value)
            }}
            value={form.tipo}
          >
            <option value="Entrada">Entrada</option>
            <option value="Saída">Saída</option>
          </select>
        </div>
        <div>
          <p>Valor</p>
          <input
            type="number"
            value={form.valor}
            onChange={(evt) => {
              handlechanger("valor", evt.target.value)
            }}
          />
        </div>
        <div>
          <p>Descrição</p>
          <input
            type="text"
            value={form.descrição}
            onChange={(evt) => {
              handlechanger("descrição", evt.target.value)
            }}
          />
        </div>
        <div>
          <p>Data</p>
          <input
            type="date"
            value={form.data}
            onChange={(evt) => {
              handlechanger("data", evt.target.value)
            }}
          />
        </div>
        <div>
          <p>Categoria</p>
          <select
            value={form.categoria}
            onChange={(evt) => {
              handlechanger("categoria", evt.target.value)
            }}
          >
            <option
              value="Despesas Fixas"
              title="Corte de cabelo , Parcela do curso ..."
            >
              Despesas Fixas
            </option>
            <option value="Assinaturas" title="Google fotos, plano vivo , IPTV">
              Assinaturas
            </option>
            <option value="Compras">Compras</option>
            <option
              value="Locomoção"
              title="99 , gasolina , seguro da moto/carro ..."
            >
              Locomoção
            </option>
            <option value="Esporte" title="Corridas ,  manutenção da bike ...">
              Esporte
            </option>
            <option value="Saúde">Saúde</option>
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value=""></option>
          </select>
        </div>
        <div>
          <p>Forma de pagamento</p>
          <select
            value={form.formadepagamento}
            onChange={(evt) => {
              handlechanger("formadepagamento", evt.target.value)
            }}
          >
            <option value="Pix">Pix</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Dinheiro">Dinheiro</option>
            <option value="Parcelado">Parcelado</option>
          </select>
        </div>
        <div>
          <p>Observação</p>
          <input
            type="text"
            value={form.observação}
            onChange={(evt) => {
              handlechanger("observação", evt.target.value)
            }}
          />
        </div>
        <button
          onClick={() => {
            if (form.valor === "" || form.data === "") {
              setcallmenssager([true, "Valor/Data nao definido❌"])
              setTimeout(() => {
                setcallmenssager([false, ""])
              }, 1500)
            } else {
              console.log(form)
              fetch(http + "/editarfluxo", {
                method: "post",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(form),
              }).then(async (res) => {
                if (res.ok) {
                  setcallmenssager([true, "Fluxo editado com sucesso✅"])
                  reload()
                  setTimeout(() => {
                    setcallmenssager([false, ""])
                  }, 1500)
                }
              })
            }
          }}
        >
          Enviar
        </button>
        {callmenssager[0] && <Menssager menssager={callmenssager[1]} />}
      </div>
    </>
  )
}
