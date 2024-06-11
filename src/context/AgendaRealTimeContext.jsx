import { onValue, ref } from "firebase/database"
import { createContext, useContext, useEffect, useState } from "react"
import { db } from "../services/firebase"
import { differenceInDays, parse, parseISO } from "date-fns"

const Context = createContext()

export const AgendaRealTimeContext = ({ children }) => {
  const [agendaRealTime, setAgendaRealTime] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [idAgendaRealtime, setIdAgendaRealtime] = useState("")
  const [servicosAgendaRealTime, setServicosAgendaRealTime] = useState([])
  const [total, setTotal] = useState(0)
  const [total30Dias, setTotal30Dias] = useState(0)

  const adicionarServico = servico => {
    if (
      servicosAgendaRealTime.includes(servico) &&
      servico.tipo === "Barbearia"
    )
      return
    setServicosAgendaRealTime(past => [...past, servico])
  }
  const deletarServico = index => {
    const newServicosAgendaReal = servicosAgendaRealTime.filter(
      (item, i) => i !== index
    )

    setServicosAgendaRealTime(newServicosAgendaReal)
  }
  const calculaTotal = servico => {
    const somaTotal = servicosAgendaRealTime.reduce((acumulador, servico) => {
      return acumulador + parseFloat(servico.preco)
    }, 0)
    return somaTotal
  }
  useEffect(() => {
    const getDados = async () => {
      const agendaRealTimesRef = ref(db, `agenda`)
      onValue(agendaRealTimesRef, snapshot => {
        var data = []
        var listaAgendaRealTime = []
        snapshot.forEach(childSnapshot => {
          const childKey = childSnapshot.key
          const childData = childSnapshot.val()
          const obj = { [childKey]: childData }
          data.push(obj)
        })
        data.forEach(e => {
          const key = Object.entries(e)[0]
          const lista = Object.entries(e)[0][1]
          lista.id = key[0]
          listaAgendaRealTime.push(lista)
        })

        setAgendaRealTime(listaAgendaRealTime)
        setIsLoading(false)
      })
    }
    getDados()
  }, [])

  useEffect(() => {
    let overallTotal = 0
    let recentTotal = 0
    const today = new Date()

    agendaRealTime.forEach(item => {
      if (item.status !== "concluido") return
      item.servicos.forEach(servico => {
        const servicePrice = parseFloat(servico.preco)
        overallTotal += servicePrice

        const serviceDate = parse(item.data, "dd/MM/yyyy", new Date())
        if (differenceInDays(today, serviceDate) <= 30) {
          recentTotal += servicePrice
        }
      })
    })

    setTotal(overallTotal)
    setTotal30Dias(recentTotal)
  }, [agendaRealTime])

  const contagemDeStatus = agendaRealTime.reduce(
    (acumulador, objetoAtual) => {
      if (objetoAtual.status === "concluido") {
        acumulador.concluido += 1
      } else if (objetoAtual.status === "cancelado") {
        acumulador.cancelado += 1
      }
      return acumulador
    },
    { concluido: 0, cancelado: 0 }
  )

  const values = {
    contagemDeStatus,
    total,
    total30Dias,
    isLoading,
    agendaRealTime,
    idAgendaRealtime,
    setIdAgendaRealtime,
    adicionarServico,
    deletarServico,
    servicosAgendaRealTime,
    setServicosAgendaRealTime,
    calculaTotal,
  }
  return <Context.Provider value={values}>{children}</Context.Provider>
}

const useAgendaRealTime = () => {
  const context = useContext(Context)
  return context
}
export { useAgendaRealTime }
