import { Box, Divider } from "@mui/material"
import Servico from "./Servico"

const ListaServicos = () => {
  return (
    <Box>
      <Servico />
      <Divider />
      <Servico />
      <Divider />
      <Servico />
      <Divider />
    </Box>
  )
}

export default ListaServicos
