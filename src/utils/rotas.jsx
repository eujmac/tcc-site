import { Navigate, createBrowserRouter } from "react-router-dom"
import Login from "../pages/Login"
import PaginaNaoEncontrada from "../pages/PaginaNaoEncontrada"
import Home from "../pages/Home"
import Agendamento from "../pages/Agendamento"
import Clientes from "../pages/Clientes"
import Configuração from "../pages/Configuração"
import DadosEmpresa from "../pages/DadosEmpresa"
import Servicos from "../pages/Servicos"
import Equipe from "../pages/Equipe"
import Protected from "../components/Protected"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    errorElement: (
      <Protected>
        <PaginaNaoEncontrada />
      </Protected>
    ),
  },
  {
    path: "/home",
    element: (
      <Protected>
        <Home />
      </Protected>
    ),
  },
  {
    path: "/agenda",
    element: (
      <Protected>
        <Agendamento />
      </Protected>
    ),
  },
  {
    path: "/clientes",
    element: (
      <Protected>
        <Clientes />
      </Protected>
    ),
  },
  {
    path: "/config",
    element: (
      <Protected>
        <Configuração />
      </Protected>
    ),
    children: [
      { element: <Navigate replace to={"/config/dados"} />, index: true },
      {
        path: "/config/dados",
        element: (
          <Protected>
            <DadosEmpresa />
          </Protected>
        ),
      },
      {
        path: "/config/servicos",
        element: (
          <Protected>
            <Servicos />
          </Protected>
        ),
      },
      {
        path: "/config/equipe",
        element: (
          <Protected>
            <Equipe />
          </Protected>
        ),
      },
    ],
  },
])
