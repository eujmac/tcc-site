import { onValue, ref } from "firebase/database"
import { createContext, useContext, useEffect, useState } from "react"
import { db } from "../services/firebase"

const Context = createContext()

export const ServicosContext = ({ children }) => {
  const [servicosRealTime, setServicosRealTime] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const getDados = async () => {
      const servicosRef = ref(db, `servicos`)
      onValue(servicosRef, snapshot => {
        var data = []
        var listaServico = []
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
          listaServico.push(lista)
        })
        setServicosRealTime(listaServico)
        setIsLoading(false)
      })
    }
    getDados()
  }, [])

  const values = {
    isLoading,
    servicosRealTime,
  }
  return <Context.Provider value={values}>{children}</Context.Provider>
}

const useServicos = () => {
  const context = useContext(Context)
  return context
}
export { useServicos }
