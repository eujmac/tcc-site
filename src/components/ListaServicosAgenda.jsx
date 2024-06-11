import { Box, Divider, Typography } from "@mui/material"
import Servico from "./Servico"
import { useAgendaLocal } from "../context/AgendaLocalContext"

const ListaServicosAgenda = () => {
  const { servicosAgendaLocal } = useAgendaLocal()
  if (servicosAgendaLocal.length === 0) {
    return (
      <Box display="flex">
        <Typography variant="h6">Lista de serviços vazia.</Typography>
      </Box>
    )
  }
  return (
    <Box>
      {servicosAgendaLocal.map(servico => (
        <Box key={servico.id}>
          <Servico servico={servico} />
          <Divider />
        </Box>
      ))}
    </Box>
  )
}

export default ListaServicosAgenda
