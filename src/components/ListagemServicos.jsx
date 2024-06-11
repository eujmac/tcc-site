import { Box, Divider } from "@mui/material"
import { useServicos } from "../context/ServicosContext"
import ServicoAgendaListagem from "./ServicoAgendaListagem"

const ListagemServicos = () => {
  const { servicosRealTime } = useServicos()

  return (
    <Box height="400px">
      {servicosRealTime.map(servico => {
        if (servico.tipo === "Barbearia") {
          return (
            <Box key={servico.id}>
              <ServicoAgendaListagem
                servico={servico}
                nome={servico.nome}
                preco={servico.preco}
              />
              <Divider />
            </Box>
          )
        }
      })}
    </Box>
  )
}

export default ListagemServicos
