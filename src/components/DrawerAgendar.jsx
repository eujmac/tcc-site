import Drawer from "@mui/material/Drawer"
import {
  Autocomplete,
  Box,
  Button,
  TextField,
  Typography,
  lighten,
  styled,
} from "@mui/material"
import { useDrawer } from "../context/DrawerContext"
import { Add } from "@mui/icons-material"

const GroupHeader = styled("div")(({ theme }) => ({
  position: "sticky",
  top: "-8px",
  padding: "4px 10px",
  color: theme.palette.cinza.main,
  backgroundColor: lighten(theme.palette.cinza.main, 0.85),
}))

const GroupItems = styled("ul")({
  padding: 0,
})
const nomes = [
  { nome: "Antonio" },
  { nome: "João Marcos" },
  { nome: "Pedro Henrique" },
  { nome: "John Sow" },
  { nome: "Fernando" },
  { nome: "Lucas" },
]

export default function DrawerAgendar() {
  const { isDrawerAgendarOpen, setIsDrawerAgendarOpen } = useDrawer()
  const options = nomes.map(option => {
    const firstLetter = option.nome[0].toUpperCase()
    return {
      firstLetter: /[0-9]/.test(firstLetter) ? "0-9" : firstLetter,
      ...option,
    }
  })
  return (
    <Drawer
      variant="temporary"
      anchor="right"
      open={isDrawerAgendarOpen}
      onClose={() => setIsDrawerAgendarOpen(false)}
      height={"100%"}
    >
      <Box width="50vw" role="presentation">
        <Box
          sx={{
            height: "100px",
            bgcolor: "primary.main",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
          p={4}
        >
          <Box>
            <Typography variant="h4" color="white">
              Segunda-feira, 99 maio
            </Typography>
            <Typography variant="h6" color="white">
              10:00
            </Typography>
          </Box>
        </Box>
        <Box p={3} display={"flex"} gap={4} alignItems="center">
          <Typography variant="h5">Cliente</Typography>
          <Autocomplete
            id="grouped-demo"
            options={options.sort(
              (a, b) => -b.firstLetter.localeCompare(a.firstLetter)
            )}
            groupBy={option => option.firstLetter}
            getOptionLabel={option => option.nome}
            sx={{ width: "100%" }}
            renderInput={params => <TextField {...params} label="" />}
            renderGroup={params => (
              <li key={params.key}>
                <GroupHeader>{params.group}</GroupHeader>
                <GroupItems>{params.children}</GroupItems>
              </li>
            )}
          />
        </Box>
        <Box p={3} pt={0}>
          <Typography variant="h5">Serviços</Typography>
          <Button
            sx={{ mt: 2 }}
            variant="outlined"
            startIcon={<Add />}
            color="bgDark"
          >
            Adicionar Serviço
          </Button>
        </Box>
        <Box p={3} pt={0}>
          <Button
            variant="contained"
            fullWidth
            color="bgDark"
            sx={{ color: "white" }}
            onClick={() => setIsDrawerAgendarOpen(false)}
          >
            Agendar
          </Button>
        </Box>
      </Box>
    </Drawer>
  )
}
