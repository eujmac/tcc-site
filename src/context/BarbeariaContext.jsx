import { onValue, ref } from "firebase/database"
import { createContext, useContext, useEffect, useState } from "react"
import { db } from "../services/firebase"

const Context = createContext()

export const BarbeariaContext = ({ children }) => {
  const idBarbearia = "-NyuqtGr_WyCGrmZk_oz"
  const [nomeBarbeariaRealTime, setNomeBarbeariaRealTime] = useState("")
  const [diasRealTime, setDiasRealTime] = useState([])
  const [horasRealTime, setHorasRealTime] = useState([])
  const [abertoRealtime, setAbertoRealtime] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const getDados = async () => {
      setIsLoading(true)
      const barbeariaRef = ref(db, `barbearia/${idBarbearia}`)
      onValue(barbeariaRef, snapshot => {
        const data = snapshot.val()
        setNomeBarbeariaRealTime(data.nome)
        setDiasRealTime(data.diasFuncionamento)
        setHorasRealTime(data.horasFuncionamento)
        setAbertoRealtime(data.aberto)
        document.title = `${data.nome} | ${data.aberto ? "Aberto" : "Fechado"}`
      })
      setIsLoading(false)
    }
    getDados()
  }, [])

  const values = {
    isLoading,
    idBarbearia,
    nomeBarbeariaRealTime,
    diasRealTime,
    horasRealTime,
    abertoRealtime,
  }
  return <Context.Provider value={values}>{children}</Context.Provider>
}

const useBarbearia = () => {
  const context = useContext(Context)
  return context
}
export { useBarbearia }
