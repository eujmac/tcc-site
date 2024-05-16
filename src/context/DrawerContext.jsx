import { createContext, useContext, useState } from "react"

const DrawerContext = createContext()

const DrawerProvider = ({ children }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  return (
    <DrawerContext.Provider value={{ isDrawerOpen, setIsDrawerOpen }}>
      {children}
    </DrawerContext.Provider>
  )
}

const useDrawer = () => {
  const context = useContext(DrawerContext)
  return context
}
export { DrawerProvider, useDrawer }
