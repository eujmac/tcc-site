import { createContext, useContext, useState } from "react"

const DialogContext = createContext()

const DialogProvider = ({ children }) => {
  const [isDialogServicoOpen, setIsDialogServicoOpen] = useState(false)
  const [isDialogExcluirEquipeOpen, setIsDialogExcluirEquipeOpen] =
    useState(false)
  const [isDialogExcluirClienteOpen, setIsDialogExcluirClienteOpen] =
    useState(false)
  const [isDialogSair, setIsDialogSair] = useState(false)
  const [isDialogServico, setIsDialogServico] = useState(false)
  const [isDialogServicoCheckout, setIsDialogServicoCheckout] = useState(false)

  return (
    <DialogContext.Provider
      value={{
        isDialogServicoOpen,
        setIsDialogServicoOpen,
        isDialogExcluirEquipeOpen,
        setIsDialogExcluirEquipeOpen,
        isDialogExcluirClienteOpen,
        setIsDialogExcluirClienteOpen,
        isDialogSair,
        setIsDialogSair,
        isDialogServico,
        setIsDialogServico,
        isDialogServicoCheckout,
        setIsDialogServicoCheckout,
      }}
    >
      {children}
    </DialogContext.Provider>
  )
}

const useDialog = () => {
  const context = useContext(DialogContext)
  return context
}
export { DialogProvider, useDialog }
