import { createContext, useContext, useState } from "react"

const DrawerContext = createContext()

const DrawerProvider = ({ children }) => {
  const [isDrawerCheckoutOpen, setIsDrawerCheckoutOpen] = useState(false)
  const [isDrawerAgendarOpen, setIsDrawerAgendarOpen] = useState(false)
  const [isDrawerEditarServicoOpen, setIsDrawerEditarServicoOpen] =
    useState(false)
  const [isDrawerAdicionarServicoOpen, setIsDrawerAdicionarServicoOpen] =
    useState(false)

  const values = {
    isDrawerCheckoutOpen,
    setIsDrawerCheckoutOpen,
    isDrawerAgendarOpen,
    setIsDrawerAgendarOpen,
    isDrawerEditarServicoOpen,
    setIsDrawerEditarServicoOpen,
    isDrawerAdicionarServicoOpen,
    setIsDrawerAdicionarServicoOpen,
  }
  return (
    <DrawerContext.Provider value={values}>{children}</DrawerContext.Provider>
  )
}

const useDrawer = () => {
  const context = useContext(DrawerContext)
  return context
}
export { DrawerProvider, useDrawer }
