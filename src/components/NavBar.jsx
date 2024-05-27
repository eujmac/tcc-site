import {
  CalendarToday,
  Home,
  Logout,
  Person,
  Settings,
} from "@mui/icons-material"
import {
  AppBar,
  Avatar,
  Box,
  Divider,
  FormControlLabel,
  FormGroup,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Stack,
  Switch,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material"
import { signOut } from "firebase/auth"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { auth, db } from "../services/firebase"
import { useBarbearia } from "../context/BarbeariaContext"
import { ref, update } from "firebase/database"

const navBarItems = [
  { nome: "Home", componente: <Home />, rota: "/home" },
  { nome: "Agenda", componente: <CalendarToday />, rota: "/agenda" },
  { nome: "Clientes", componente: <Person />, rota: "/clientes" },
]
const NavBar = () => {
  const navigate = useNavigate()

  const { nomeBarbeariaRealTime, abertoRealtime, idBarbearia } = useBarbearia()
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  // const mostraSnackbar = tipoDispatch => {
  //   setIsLoading(false)
  //   dispatch(tipoDispatch)
  //   handleClick()
  // }
  const handleChange = () => {
    update(ref(db, `barbearia/${idBarbearia}`), {
      aberto: abertoRealtime ? false : true,
    })
  }
  const sairDaConta = async () => {
    try {
      await signOut(auth)
    } catch (error) {
      console.log(error)
    }
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
                borderRadius: "20px",
                color: "black",
              }}
            >
              <FormControlLabel
                control={
                  <Switch
                    defaultChecked
                    checked={abertoRealtime}
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
            <Tooltip title="Account settings">
              <IconButton
                onClick={handleClick}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={open ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
              >
                <Avatar sx={{ alignSelf: "center" }}>A</Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 1.5,
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  "&::before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <MenuItem>
                <Avatar /> Gerente
              </MenuItem>
              <Divider />
              <MenuItem
                onClick={() => {
                  handleClose()
                  navigate("/config")
                }}
              >
                <ListItemIcon>
                  <Settings fontSize="small" />
                </ListItemIcon>
                Configuração
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleClose()
                  sairDaConta()
                }}
              >
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Sair da conta
              </MenuItem>
            </Menu>
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default NavBar
