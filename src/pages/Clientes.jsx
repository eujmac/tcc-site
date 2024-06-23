import {
  Box,
  Button,
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
import { colunasCliente } from "../utils/dados"
import { useDrawer } from "../context/DrawerContext"
import { useCliente } from "../context/ClienteContext"
import { useEffect, useState } from "react"
import { ptBR } from "@mui/x-data-grid/locales"

const Clientes = () => {
  const { setIsDrawerAdicionarClienteOpen } = useDrawer()
  const { clientesRealTime } = useCliente()
  const [procurar, setProcurar] = useState("")
  const [linhas, setLinhas] = useState(clientesRealTime)

  useEffect(() => {
    setLinhas(clientesRealTime)
  }, [clientesRealTime])

  const handleFilter = e => {
    const value = e.target.value.toLowerCase()
    setProcurar(value)

    if (value !== "") {
      const filteredRows = linhas.filter(
        row =>
          row.nome.toLowerCase().includes(value) ||
          row.email.toLowerCase().includes(value) ||
          row.telefone.toLowerCase().includes(value)
      )
      setLinhas(filteredRows)
    } else {
      setLinhas(clientesRealTime)
    }
  }
  return (
    <Box>
      <NavBar />
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
                  Lista de Clientes{" "}
                </Typography>
                <Typography variant="h6">
                  Visualizar, adicionar, editar e excluir dados dos clientes.
                </Typography>
              </Box>
              <Box>
                <Button
                  variant="contained"
                  onClick={() => setIsDrawerAdicionarClienteOpen(true)}
                >
                  Adicionar
                </Button>
              </Box>
            </Box>
            <Box sx={{ display: "flex" }}>
              <Paper variant="outlined" sx={{ display: "flex", flex: 1 }}>
                <InputBase
                  sx={{ ml: 1, flex: 1 }}
                  value={procurar}
                  onChange={handleFilter}
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
                localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
                rows={linhas}
                columns={colunasCliente}
                disableRowSelectionOnClick
                disableColumnFilter
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
