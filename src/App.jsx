import MainContext from "./context/MainContext"
import DrawerCheckout from "./components/drawer/DrawerCheckout"
import DrawerAgendar from "./components/drawer/DrawerAgendar"
import DrawerAdicionarServico from "./components/drawer/DrawerAdicionarServico"
import DrawerEditarServico from "./components/drawer/DrawerEditarServico"
import DialogExcluirServico from "./components/dialog/DialogExcluirServico"
import SnackbarGlobal from "./components/snackback/SnackbarGlobal"
import { RouterProvider } from "react-router-dom"
import { router } from "./utils/rotas"
import { useBarbearia } from "./context/BarbeariaContext"
import { useServicos } from "./context/ServicosContext"
import Loading from "./components/Loading"
import DrawerAdicionarEquipe from "./components/drawer/DrawerAdicionarEquipe"
import { useEquipe } from "./context/EquipeContext"
import DialogExcluirEquipe from "./components/dialog/DialogExcluirEquipe"
import DrawerEditarEquipe from "./components/drawer/DrawerEditarEquipe"
import DrawerAdicionarCliente from "./components/drawer/DrawerAdicionarCliente"
import { useCliente } from "./context/ClienteContext"
import DrawerEditarCliente from "./components/drawer/DrawerEditarCliente"
import DialogExcluirCliente from "./components/dialog/DialogExcluirCliente"

const App = () => {
  return (
    <MainContext>
      <AppContent />
    </MainContext>
  )
}

const AppContent = () => {
  const { isLoading: barbeariaLoading } = useBarbearia()
  const { isLoading: servicosLoading } = useServicos()
  const { isLoading: equipeLoading } = useEquipe()
  const { isLoading: clientesLoading } = useCliente()

  if (barbeariaLoading || servicosLoading || equipeLoading || clientesLoading) {
    return <Loading />
  }
  return (
    <>
      <DrawerCheckout />
      <DrawerAgendar />
      <DrawerAdicionarServico />
      <DrawerAdicionarEquipe />
      <DrawerAdicionarCliente />
      <DrawerEditarServico />
      <DrawerEditarEquipe />
      <DrawerEditarCliente />
      <DialogExcluirServico />
      <DialogExcluirCliente />
      <DialogExcluirEquipe />
      <SnackbarGlobal />
      <RouterProvider router={router} />
    </>
  )
}

export default App
