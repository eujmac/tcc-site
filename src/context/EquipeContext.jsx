import { onValue, ref } from "firebase/database"
import { createContext, useContext, useEffect, useState } from "react"
import { db } from "../services/firebase"

const Context = createContext()

export const EquipeContext = ({ children }) => {
  const [equipeRealTime, setEquipeRealTime] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    const getDados = async () => {
      const equipeRef = ref(db, `equipe`)
      onValue(equipeRef, snapshot => {
        var data = []
        var listaEquipe = []
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
          listaEquipe.push(lista)
        })
        setEquipeRealTime(listaEquipe)
        setIsLoading(false)
      })
    }
    getDados()
  }, [])

  const values = {
    isLoading,
    equipeRealTime,
  }
  return <Context.Provider value={values}>{children}</Context.Provider>
}

const useEquipe = () => {
  const context = useContext(Context)
  return context
}
export { useEquipe }
