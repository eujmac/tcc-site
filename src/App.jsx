import { Route, Routes } from "react-router-dom"
import Login from "./pages/Login"
import Home from "./pages/Home"
import Agendamento from "./pages/Agendamento"
import Clientes from "./pages/Clientes"
import Configuração from "./pages/Configuração"
import PaginaNaoEncontrada from "./pages/PaginaNaoEncontrada"

export const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/agenda" element={<Agendamento />}></Route>
        <Route path="/clientes" element={<Clientes />}></Route>
        <Route path="/config" element={<Configuração />}></Route>
        <Route path="*" element={<PaginaNaoEncontrada />}></Route>
      </Routes>
    </>
  )
}
