import { createContext, useContext, useState } from "react"

const DrawerContext = createContext()

const DrawerProvider = ({ children }) => {
  const [isDrawerCheckoutOpen, setIsDrawerCheckoutOpen] = useState(false)
  const [isDrawerAgendarOpen, setIsDrawerAgendarOpen] = useState(false)

  return (
    <DrawerContext.Provider
      value={{
        isDrawerCheckoutOpen,
        isDrawerAgendarOpen,
        setIsDrawerCheckoutOpen,
        setIsDrawerAgendarOpen,
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
