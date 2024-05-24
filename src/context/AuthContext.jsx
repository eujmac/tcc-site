import { createContext, useContext, useEffect, useState } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "../services/firebase"

export const Context = createContext()

export const AuthContext = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let unsubscribe = onAuthStateChanged(auth, currentUser => {
      setLoading(false)
      if (currentUser) {
        setUser(currentUser)
      } else {
        setUser(null)
      }
    })
    return () => {
      if (unsubscribe) {
        unsubscribe()
      }
    }
  }, [])

  const values = {
    user,
    setUser,
  }
  return (
    <Context.Provider value={values}>{!loading && children}</Context.Provider>
  )
}

const useAuth = () => {
  const context = useContext(Context)
  return context
}
export { useAuth }
