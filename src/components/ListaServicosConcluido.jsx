import { Box, Divider, Typography } from "@mui/material"
import { useAgendaRealTime } from "../context/AgendaRealTimeContext"
import ServicoConcluido from "./ServicoConcluido"

const ListaServicosConcluido = () => {
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
      {servicosAgendaRealTime.map(servico => (
        <Box key={servico.id}>
          <ServicoConcluido servico={servico} />
          <Divider />
        </Box>
      ))}
    </Box>
  )
}

export default ListaServicosConcluido
