import {
  CalendarToday,
  ExitToApp,
  Home,
  Person,
  Settings,
  Assessment,
} from "@mui/icons-material"
import {
  Box,
  AppBar,
  FormControlLabel,
  FormGroup,
  IconButton,
  Stack,
  Switch,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material"
import { useNavigate } from "react-router-dom"
import { db } from "../services/firebase"
import { useBarbearia } from "../context/BarbeariaContext"
import { ref, update } from "firebase/database"
import { useDialog } from "../context/DialogContext"

const navBarItems = [
  { nome: "Home", componente: <Home />, rota: "/home" },
  { nome: "Agenda", componente: <CalendarToday />, rota: "/agenda" },
  { nome: "Clientes", componente: <Person />, rota: "/clientes" },
  { nome: "Dashboard", componente: <Assessment />, rota: "/dashboard" },
  { nome: "Configuração", componente: <Settings />, rota: "/config" },
]
const NavBar = () => {
  const navigate = useNavigate()
  const { nomeBarbeariaRealTime, abertoRealtime, idBarbearia } = useBarbearia()
  const { setIsDialogSair } = useDialog()

  const handleChange = () => {
    update(ref(db, `barbearia/${idBarbearia}`), {
      aberto: abertoRealtime ? false : true,
    })
  }

  return (
    <Box sx={{ flexGrow: 1, mb: 8 }}>
      <AppBar position="fixed" color="bgDark">
        <Toolbar sx={{ color: "white" }}>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, color: "white" }}
          >
            {nomeBarbeariaRealTime}
          </Typography>

          <Stack direction="row" spacing={2}>
            <FormGroup
              sx={{
                alignSelf: "center",
                bgcolor: "lightgray",
                p: 0.5,
                pl: 2,
                borderRadius: "10px",
                color: "black",
              }}
            >
              <FormControlLabel
                control={
                  <Switch
                    checked={abertoRealtime || false}
                    onChange={handleChange}
                  />
                }
                label="Aberto?"
              />
            </FormGroup>
            {navBarItems.map(item => (
              <Tooltip title={item.nome} key={item.nome}>
                <IconButton
                  size="large"
                  aria-label={item.nome}
                  color={
                    location.pathname.includes(item.rota)
                      ? "primary"
                      : "inherit"
                  }
                  onClick={() => navigate(item.rota)}
                >
                  {item.componente}
                </IconButton>
              </Tooltip>
            ))}
            <Tooltip title="Sair">
              <IconButton
                color="inherit"
                size="large"
                aria-label="Sair"
                onClick={() => setIsDialogSair(true)}
              >
                <ExitToApp />
              </IconButton>
            </Tooltip>
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default NavBar
