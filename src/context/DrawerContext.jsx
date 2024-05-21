import { createContext, useContext, useState } from "react"

const DrawerContext = createContext()

const DrawerProvider = ({ children }) => {
  const [isDrawerCheckoutOpen, setIsDrawerCheckoutOpen] = useState(false)
  const [isDrawerAgendarOpen, setIsDrawerAgendarOpen] = useState(false)
  const [isDrawerTabelaOpen, setIsDrawerTabelaOpen] = useState(false)

  return (
    <DrawerContext.Provider
      value={{
        isDrawerCheckoutOpen,
        setIsDrawerCheckoutOpen,
        isDrawerAgendarOpen,
        setIsDrawerAgendarOpen,
        isDrawerTabelaOpen,
        setIsDrawerTabelaOpen,
      }}
    >
      {children}
    </DrawerContext.Provider>
  )
}

const useDrawer = () => {
  const context = useContext(DrawerContext)
  return context
}
export { DrawerProvider, useDrawer }
