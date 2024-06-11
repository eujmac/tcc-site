import { Box, Divider } from "@mui/material"
import { useServicos } from "../context/ServicosContext"
import ServicoAgendaListagemCheckout from "./ServicoAgendaListagemCheckout"

const ListagemServicosCheckout = () => {
  const { servicosRealTime } = useServicos()

  return (
    <Box height="400px">
      {servicosRealTime.map(servico => {
        return (
          <Box key={servico.id}>
            <ServicoAgendaListagemCheckout
              servico={servico}
              nome={servico.nome}
              preco={servico.preco}
            />
            <Divider />
          </Box>
        )
      })}
    </Box>
  )
}

export default ListagemServicosCheckout
