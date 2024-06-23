import { Box, Divider, Typography } from "@mui/material"
import { useServicos } from "../context/ServicosContext"
import ServicoAgendaListagemCheckout from "./ServicoAgendaListagemCheckout"

const ListagemServicosCheckout = () => {
  const { servicosRealTime } = useServicos()

  return (
    <Box height="700px" display="flex" gap={1}>
      <Box flex={1}>
        <Typography variant="h5" textAlign="center" fontWeight="bold">
          Tipo Barbearia
        </Typography>
        {servicosRealTime.map(servico => {
          if (servico.tipo !== "Barbearia") return
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
      <Box flex={1}>
        <Typography variant="h5" textAlign="center" fontWeight="bold">
          Tipo Venda
        </Typography>
        {servicosRealTime.map(servico => {
          if (servico.tipo !== "Venda") return

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
    </Box>
  )
}

export default ListagemServicosCheckout
