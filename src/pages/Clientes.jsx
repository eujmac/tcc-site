import {
  Box,
  Button,
  Chip,
  Container,
  IconButton,
  InputBase,
  Paper,
  Stack,
  Typography,
} from "@mui/material"
import NavBar from "../components/NavBar"
import { DataGrid } from "@mui/x-data-grid"
import { Search } from "@mui/icons-material"
import { colunasCliente, linhasCliente } from "../utils/dados"
import { useDrawer } from "../context/DrawerContext"
import DialogExcluir from "../components/DialogExcluir"
import DrawerTabela from "../components/DrawerTabela"

const Clientes = () => {
  const { isDrawerTabelaOpen, setIsDrawerTabelaOpen } = useDrawer()

  return (
    <Box>
      <NavBar />
      <DialogExcluir
        titulo={"Excluir Cliente?"}
        mensagem={"Você tem certeza que deseja excluir o cliente?"}
      />

      <Container maxWidth="xl" sx={{ mt: 10 }}>
        <Paper variant="outlined">
          <Stack spacing={2} p={2}>
            <Box
              display={"flex"}
              justifyContent={"space-between"}
              alignItems="center"
            >
              <Box>
                <Typography variant="h5" fontWeight={"bold"}>
                  Lista de Clientes <Chip label="18" variant="outlined" />
                </Typography>
                <Typography variant="h6">
                  Visualizar, adicionar, editar e excluir dados dos clientes.
                </Typography>
              </Box>
              <Box>
                <Button
                  variant="contained"
                  onClick={() => setIsDrawerTabelaOpen(true)}
                >
                  Adicionar
                </Button>
              </Box>
            </Box>
            <Box sx={{ display: "flex" }}>
              <Paper variant="outlined" sx={{ display: "flex", flex: 1 }}>
                <InputBase
                  sx={{ ml: 1, flex: 1 }}
                  placeholder="Procurar pelo nome, email ou celular"
                  inputProps={{ "aria-label": "search google maps" }}
                />
                <IconButton
                  type="button"
                  sx={{ p: "10px" }}
                  aria-label="search"
                >
                  <Search />
                </IconButton>
              </Paper>
            </Box>
            <Box sx={{ height: "70vh", width: "100%" }}>
              <DataGrid
                rows={linhasCliente}
                columns={colunasCliente}
                disableRowSelectionOnClick
                hideFooter
              />
            </Box>
          </Stack>
        </Paper>
      </Container>
    </Box>
  )
}

export default Clientes
