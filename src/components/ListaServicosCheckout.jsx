import { Box, Divider, Typography } from "@mui/material"
import { useAgendaRealTime } from "../context/AgendaRealTimeContext"
import ServicoCheckout from "./ServicoCheckout"

const ListaServicosCheckout = () => {
  const { servicosAgendaRealTime } = useAgendaRealTime()

  if (servicosAgendaRealTime.length === 0) {
    return (
      <Box display="flex">
        <Typography variant="h6">Lista de serviços vazia.</Typography>
      </Box>
    )
  }
  return (
    <Box>
      {servicosAgendaRealTime.map((servico, index) => (
        <Box key={servico.id}>
          <ServicoCheckout servico={servico} index={index} />
          <Divider />
        </Box>
      ))}
    </Box>
  )
}

export default ListaServicosCheckout
