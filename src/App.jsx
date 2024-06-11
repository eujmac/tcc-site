import MainContext from "./context/MainContext"
import DrawerCheckout from "./components/drawer/DrawerCheckout"
import DrawerAgendar from "./components/drawer/DrawerAgendar"
import DrawerAdicionarServico from "./components/drawer/DrawerAdicionarServico"
import DrawerEditarServico from "./components/drawer/DrawerEditarServico"
import DialogExcluirServico from "./components/dialog/DialogExcluirServico"
import SnackbarGlobal from "./components/snackback/SnackbarGlobal"
import Loading from "./components/Loading"
import DrawerAdicionarEquipe from "./components/drawer/DrawerAdicionarEquipe"
import DialogExcluirEquipe from "./components/dialog/DialogExcluirEquipe"
import DrawerEditarEquipe from "./components/drawer/DrawerEditarEquipe"
import DrawerAdicionarCliente from "./components/drawer/DrawerAdicionarCliente"
import { RouterProvider } from "react-router-dom"
import DrawerEditarCliente from "./components/drawer/DrawerEditarCliente"
import DialogExcluirCliente from "./components/dialog/DialogExcluirCliente"
import DialogSair from "./components/dialog/DialogSair"
import DialogServico from "./components/dialog/DialogServico"
import { router } from "./utils/rotas"
import { useBarbearia } from "./context/BarbeariaContext"
import { useServicos } from "./context/ServicosContext"
import { useEquipe } from "./context/EquipeContext"
import { useCliente } from "./context/ClienteContext"
import { useAgendaRealTime } from "./context/AgendaRealTimeContext"
import DialogServicoCheckout from "./components/dialog/DialogServicoCheckout"
import DrawerConcluido from "./components/drawer/DrawerConcluido"

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
  const { isLoading: agendaRealTimeLoading } = useAgendaRealTime()

  if (
    barbeariaLoading ||
    servicosLoading ||
    equipeLoading ||
    clientesLoading ||
    agendaRealTimeLoading
  ) {
    return <Loading />
  }
  return (
    <>
      <DrawerCheckout />
      <DrawerConcluido />
      <DrawerAgendar />
      <DrawerAdicionarServico />
      <DrawerAdicionarEquipe />
      <DrawerAdicionarCliente />
      <DrawerEditarServico />
      <DrawerEditarEquipe />
      <DrawerEditarCliente />
      <DialogExcluirServico />
      <DialogSair />
      <DialogServico />
      <DialogServicoCheckout />
      <DialogExcluirCliente />
      <DialogExcluirEquipe />
      <SnackbarGlobal />
      <RouterProvider router={router} />
    </>
  )
}

export default App
