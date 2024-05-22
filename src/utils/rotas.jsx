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

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    errorElement: <PaginaNaoEncontrada />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/agenda",
    element: <Agendamento />,
  },
  {
    path: "/clientes",
    element: <Clientes />,
  },
  {
    path: "/config",
    element: <Configuração />,
    children: [
      { element: <Navigate replace to={"/config/dados"} />, index: true },
      { path: "/config/dados", element: <DadosEmpresa /> },
      { path: "/config/servicos", element: <Servicos /> },
      { path: "/config/equipe", element: <Equipe /> },
    ],
  },
])
