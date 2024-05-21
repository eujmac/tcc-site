import { createContext, useContext, useState } from "react"

const DialogContext = createContext()

const DialogProvider = ({ children }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  return (
    <DialogContext.Provider
      value={{
        isDialogOpen,
        setIsDialogOpen,
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
