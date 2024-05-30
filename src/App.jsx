import MainContext from "./context/MainContext"
import DrawerCheckout from "./components/DrawerCheckout"
import DrawerAgendar from "./components/DrawerAgendar"
import DrawerAdicionarServico from "./components/DrawerAdicionarServico"
import DrawerEditarServico from "./components/DrawerEditarEquipe"
import DialogExcluirServico from "./components/DialogExcluirServico"
import SnackbarGlobal from "./components/SnackbarGlobal"
import { RouterProvider } from "react-router-dom"
import { router } from "./utils/rotas"
import { useBarbearia } from "./context/BarbeariaContext"
import { useServicos } from "./context/ServicosContext"

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

  if (barbeariaLoading || servicosLoading) {
    return <p>Carregando...</p>
  }
  return (
    <>
      <DrawerCheckout />
      <DrawerAgendar />
      <DrawerAdicionarServico />
      <DrawerEditarServico />
      <DialogExcluirServico />
      <SnackbarGlobal />
      <RouterProvider router={router} />
    </>
  )
}

export default App
