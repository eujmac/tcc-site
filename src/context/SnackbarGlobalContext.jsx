import { createContext, useContext, useReducer, useState } from "react"

const SnackbarGlobalContext = createContext()

const initialState = {
  tipo: "success",
  mensagem: "Itens salvos com sucesso!",
}

const reducer = (state, action) => {
  switch (action) {
    case "sucesso":
      return initialState
    case "sucessoEditar":
      return {
        tipo: "success",
        mensagem: "Item editado com sucesso!",
      }
    case "sucessoAdicionar":
      return {
        tipo: "success",
        mensagem: "Item adicionado com sucesso!",
      }
    case "sucessoExcluir":
      return {
        tipo: "success",
        mensagem: "Item excluído com sucesso!",
      }
    case "login.error":
      return {
        tipo: "error",
        mensagem: "Credenciais Inválidas!",
      }
    case "dadosEmpresa.errorNomeVazio":
      return {
        tipo: "error",
        mensagem: "O campo nome deve ser preenchido!",
      }
    case "dadosEmpresa.errorSenhaAtual":
      return {
        tipo: "error",
        mensagem: "Senha Atual incorreta!",
      }
    case "dadosEmpresa.errorEmailSenhaVazio":
      return {
        tipo: "error",
        mensagem: "Campos email e senha estão vazios!",
      }
    default:
      return state
  }
}
const SnackbarGlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const [open, setOpen] = useState(false)
  const handleClick = () => {
    setOpen(true)
  }

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return
    }

    setOpen(false)
  }
  return (
    <SnackbarGlobalContext.Provider
      value={{ state, dispatch, open, handleClick, handleClose }}
    >
      {children}
    </SnackbarGlobalContext.Provider>
  )
}

const useSnackbarGlobal = () => {
  const context = useContext(SnackbarGlobalContext)
  return context
}
export { SnackbarGlobalProvider, useSnackbarGlobal }
