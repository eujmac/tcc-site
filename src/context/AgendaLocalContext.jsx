import { createContext, useContext, useState } from "react"

const Context = createContext()

export const AgendaLocalContext = ({ children }) => {
  const [dataAgendaLocal, setDataAgendaLocal] = useState("11/11/1111")
  const [horaAgendaLocal, setHoraAgendaLocal] = useState("")
  const [barbeiro, setBarbeiro] = useState({})
  const [servicosAgendaLocal, setServicosAgendaLocal] = useState([])

  const adicionarServico = servico => {
    if (servicosAgendaLocal.includes(servico)) return
    setServicosAgendaLocal(past => [...past, servico])
  }
  const deletarServico = index => {
    const novosServicos = servicosAgendaLocal.filter(
      (servico, i) => i !== index
    )
    setServicosAgendaLocal(novosServicos)
  }

  const values = {
    dataAgendaLocal,
    setDataAgendaLocal,
    horaAgendaLocal,
    setHoraAgendaLocal,
    servicosAgendaLocal,
    setServicosAgendaLocal,
    adicionarServico,
    deletarServico,
    barbeiro,
    setBarbeiro,
  }
  return <Context.Provider value={values}>{children}</Context.Provider>
}

const useAgendaLocal = () => {
  const context = useContext(Context)
  return context
}
export { useAgendaLocal }
