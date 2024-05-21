import { Box, Button, Divider, Typography } from "@mui/material"
import { DataGrid } from "@mui/x-data-grid"
import { linhasEquipe, colunasEquipe } from "../utils/dados"
const Equipe = () => {
  return (
    <>
      <Box
        sx={{
          height: "136px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mx: 3,
        }}
      >
        <Typography variant="h4">Catalogo de Colaboradores</Typography>
        <Box display="flex" gap={2}>
          <Button variant="contained">adicionar</Button>
          <Button variant="contained">SALVAR</Button>
        </Box>
      </Box>
      <Divider />
      <Box sx={{ height: "75vh", width: "100%", p: 2 }}>
        <DataGrid
          rows={linhasEquipe}
          columns={colunasEquipe}
          disableRowSelectionOnClick
          hideFooter
        />
      </Box>
    </>
  )
}

export default Equipe
