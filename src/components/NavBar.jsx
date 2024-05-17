import { CalendarToday, Home, Person, Settings } from "@mui/icons-material"
import {
  AppBar,
  Avatar,
  Box,
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

const navBarItems = [
  { nome: "Home", componente: <Home />, rota: "/home" },
  { nome: "Agenda", componente: <CalendarToday />, rota: "/agenda" },
  { nome: "Clientes", componente: <Person />, rota: "/clientes" },
  { nome: "Configuração", componente: <Settings />, rota: "/config" },
]
const NavBar = () => {
  const navigate = useNavigate()

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="bgDark">
        <Toolbar sx={{ color: "white" }}>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, color: "white" }}
          >
            BarberShop
          </Typography>

          <Stack direction="row" spacing={2}>
            <FormGroup
              sx={{
                alignSelf: "center",
                bgcolor: "lightgray",
                p: 0.5,
                borderRadius: "20px",
                color: "black",
              }}
            >
              <FormControlLabel
                control={<Switch defaultChecked />}
                label="Aberto?"
              />
            </FormGroup>
            {navBarItems.map(item => (
              <Tooltip title={item.nome} key={item.nome}>
                <IconButton
                  size="large"
                  aria-label={item.nome}
                  color="inherit"
                  onClick={() => navigate(item.rota)}
                >
                  {item.componente}
                </IconButton>
              </Tooltip>
            ))}
            <Avatar sx={{ alignSelf: "center" }}>A</Avatar>
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default NavBar
