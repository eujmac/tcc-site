import { onValue, ref } from "firebase/database"
import { createContext, useContext, useEffect, useState } from "react"
import { db } from "../services/firebase"

const Context = createContext()

export const ServicosContext = ({ children }) => {
  const [servicosRealTime, setServicosRealTime] = useState([])

  useEffect(() => {
    const getDados = async () => {
      const servicosRef = ref(db, `servicos`)
      onValue(servicosRef, snapshot => {
        var data = []
        snapshot.forEach(childSnapshot => {
          const childKey = childSnapshot.key
          const childData = childSnapshot.val()
          const obj = { [childKey]: childData }
          data.push(obj)
        })
        setServicosRealTime(data)
      })
    }
    getDados()
  }, [])

  const values = {
    servicosRealTime,
  }
  return <Context.Provider value={values}>{children}</Context.Provider>
}

const useServicos = () => {
  const context = useContext(Context)
  return context
}
export { useServicos }
