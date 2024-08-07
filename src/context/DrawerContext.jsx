import { createContext, useContext, useState } from "react"

const DrawerContext = createContext()

const DrawerProvider = ({ children }) => {
  const [isDrawerCheckoutOpen, setIsDrawerCheckoutOpen] = useState(false)
  const [isDrawerAgendarOpen, setIsDrawerAgendarOpen] = useState(false)
  const [isDrawerEditarServicoOpen, setIsDrawerEditarServicoOpen] =
    useState(false)
  const [isDrawerAdicionarServicoOpen, setIsDrawerAdicionarServicoOpen] =
    useState(false)
  const [isDrawerEditarEquipeOpen, setIsDrawerEditarEquipeOpen] =
    useState(false)
  const [isDrawerAdicionarEquipeOpen, setIsDrawerAdicionarEquipeOpen] =
    useState(false)
  const [isDrawerAdicionarClienteOpen, setIsDrawerAdicionarClienteOpen] =
    useState(false)
  const [isDrawerEditarClienteOpen, setIsDrawerEditarClienteOpen] =
    useState(false)
  const [isDrawerConcluidoOpen, setIsDrawerConcluidoOpen] = useState(false)

  const values = {
    isDrawerCheckoutOpen,
    setIsDrawerCheckoutOpen,
    isDrawerAgendarOpen,
    setIsDrawerAgendarOpen,
    isDrawerEditarServicoOpen,
    setIsDrawerEditarServicoOpen,
    isDrawerAdicionarServicoOpen,
    setIsDrawerAdicionarServicoOpen,
    isDrawerAdicionarEquipeOpen,
    setIsDrawerAdicionarEquipeOpen,
    isDrawerEditarEquipeOpen,
    setIsDrawerEditarEquipeOpen,
    isDrawerAdicionarClienteOpen,
    setIsDrawerAdicionarClienteOpen,
    isDrawerEditarClienteOpen,
    setIsDrawerEditarClienteOpen,
    isDrawerConcluidoOpen,
    setIsDrawerConcluidoOpen,
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
