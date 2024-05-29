import { Box, Button, Divider, Typography } from "@mui/material"
import { DataGrid } from "@mui/x-data-grid"
import { colunasServicos } from "../utils/dados"
import { useDrawer } from "../context/DrawerContext"
import { useServicos } from "../context/ServicosContext"

const Servicos = () => {
  const linhasServicos = []
  const { setIsDrawerAdicionarServicoOpen } = useDrawer()
  const { servicosRealTime } = useServicos()

  servicosRealTime.forEach(e => {
    const key = Object.entries(e)[0]
    const lista = Object.entries(e)[0][1]
    lista.id = key[0]
    linhasServicos.push(lista)
  })
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
        <Typography variant="h4">Catalogo de Serviços</Typography>
        <Box display="flex" gap={2}>
          <Button
            variant="contained"
            onClick={() => {
              setIsDrawerAdicionarServicoOpen(true)
            }}
          >
            adicionar
          </Button>
        </Box>
      </Box>
      <Divider />
      <Box sx={{ height: "75vh", width: "100%", p: 2 }}>
        <DataGrid
          rows={linhasServicos}
          columns={colunasServicos}
          disableRowSelectionOnClick
          disableColumnFilter
          hideFooter
        />
      </Box>
    </>
  )
}

export default Servicos
