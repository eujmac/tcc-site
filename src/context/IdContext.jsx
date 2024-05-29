import { createContext, useContext, useState } from "react"

export const Context = createContext()

export const IdContext = ({ children }) => {
  const [id, setId] = useState(null)

  const values = {
    id,
    setId,
  }
  return <Context.Provider value={values}>{children}</Context.Provider>
}

const useId = () => {
  const context = useContext(Context)
  return context
}
export { useId }
