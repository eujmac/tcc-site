import {
  Box,
  Button,
  Divider,
  IconButton,
  InputBase,
  Paper,
  Typography,
} from "@mui/material"
import { DataGrid } from "@mui/x-data-grid"
import { colunasServicos } from "../utils/dados"
import { useDrawer } from "../context/DrawerContext"
import { useServicos } from "../context/ServicosContext"
import { useEffect, useState } from "react"
import { Search } from "@mui/icons-material"

const Servicos = () => {
  const { setIsDrawerAdicionarServicoOpen } = useDrawer()

  const { servicosRealTime } = useServicos()
  const [procurar, setProcurar] = useState("")
  const [linhas, setLinhas] = useState(servicosRealTime)

  useEffect(() => {
    setLinhas(servicosRealTime)
  }, [servicosRealTime])

  const handleFilter = e => {
    const value = e.target.value.toLowerCase()
    setProcurar(value)

    if (value !== "") {
      const filteredRows = linhas.filter(
        row =>
          row.nome.toLowerCase().includes(value) ||
          row.tipo.toLowerCase().includes(value) ||
          row.preco.toLowerCase().includes(value)
      )
      setLinhas(filteredRows)
    } else {
      setLinhas(servicosRealTime)
    }
  }
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
        <Paper variant="outlined" sx={{ display: "flex", flex: 1, mb: 2 }}>
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            value={procurar}
            onChange={handleFilter}
            placeholder="Procurar pelo nome, tipo de produto ou preço"
            inputProps={{ "aria-label": "search google maps" }}
          />
          <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
            <Search />
          </IconButton>
        </Paper>
        <DataGrid
          sx={{ height: "65vh" }}
          rows={linhas}
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
