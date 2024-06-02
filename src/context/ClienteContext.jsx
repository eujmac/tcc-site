import { onValue, ref } from "firebase/database"
import { createContext, useContext, useEffect, useState } from "react"
import { db } from "../services/firebase"

const Context = createContext()

export const ClienteContext = ({ children }) => {
  const [clientesRealTime, setClientesRealTime] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    const getDados = async () => {
      const clientesRef = ref(db, `clientes`)
      onValue(clientesRef, snapshot => {
        var data = []
        var listaClientes = []
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
          listaClientes.push(lista)
        })
        setClientesRealTime(listaClientes)
        setIsLoading(false)
      })
    }
    getDados()
  }, [])

  const values = {
    isLoading,
    clientesRealTime,
  }
  return <Context.Provider value={values}>{children}</Context.Provider>
}

const useCliente = () => {
  const context = useContext(Context)
  return context
}
export { useCliente }
