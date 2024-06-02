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
import { colunasEquipe } from "../utils/dados"
import { useDrawer } from "../context/DrawerContext"
import { useEquipe } from "../context/EquipeContext"
import { useEffect, useState } from "react"
import { Search } from "@mui/icons-material"
const Equipe = () => {
  const { setIsDrawerAdicionarEquipeOpen } = useDrawer()
  const { equipeRealTime } = useEquipe()
  const [procurar, setProcurar] = useState("")
  const [linhas, setLinhas] = useState(equipeRealTime)

  useEffect(() => {
    setLinhas(equipeRealTime)
  }, [equipeRealTime])

  const handleFilter = e => {
    const value = e.target.value.toLowerCase()
    setProcurar(value)

    if (value !== "") {
      const filteredRows = linhas.filter(
        row =>
          row.nome.toLowerCase().includes(value) ||
          row.email.toLowerCase().includes(value) ||
          row.celular.toLowerCase().includes(value)
      )
      setLinhas(filteredRows)
    } else {
      setLinhas(equipeRealTime)
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
        <Typography variant="h4">Catalogo da Equipe</Typography>
        <Box display="flex" gap={2}>
          <Button
            variant="contained"
            onClick={() => {
              setIsDrawerAdicionarEquipeOpen(true)
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
            placeholder="Procurar pelo nome, email ou celular"
            inputProps={{ "aria-label": "search google maps" }}
          />
          <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
            <Search />
          </IconButton>
        </Paper>
        <DataGrid
          sx={{ height: "65vh" }}
          rows={linhas}
          columns={colunasEquipe}
          disableRowSelectionOnClick
          disableColumnFilter
          hideFooter
        />
      </Box>
    </>
  )
}

export default Equipe
