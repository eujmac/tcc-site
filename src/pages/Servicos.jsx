import { Box, Button, Divider, Typography } from "@mui/material"
import { DataGrid } from "@mui/x-data-grid"
import { linhasServicos, colunasServicos } from "../utils/dados"
import DialogExcluir from "../components/DialogExcluir"
import { useDrawer } from "../context/DrawerContext"
const Servicos = () => {
  const { setIsDrawerTabelaOpen } = useDrawer()

  return (
    <>
      <DialogExcluir
        titulo={"Excluir Serviço?"}
        mensagem={"Você tem certeza que deseja excluir esse serviço?"}
      />
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
              setIsDrawerTabelaOpen(true)
            }}
          >
            adicionar
          </Button>
          <Button variant="contained">SALVAR</Button>
        </Box>
      </Box>
      <Divider />
      <Box sx={{ height: "75vh", width: "100%", p: 2 }}>
        <DataGrid
          rows={linhasServicos}
          columns={colunasServicos}
          disableRowSelectionOnClick
          hideFooter
        />
      </Box>
    </>
  )
}

export default Servicos
