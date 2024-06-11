import { Box, Container, Divider, Grid, Paper, Typography } from "@mui/material"
import NavBar from "../components/NavBar"
import { ArrowForwardIosSharp, KeyboardArrowDown } from "@mui/icons-material"
import { Outlet, useLocation, useNavigate } from "react-router-dom"

const CardConfig = ({ titulo, subtitulo, nav }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const color = location.pathname.includes(nav) ? "primary" : "inherit"

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      sx={{
        cursor: "pointer",
        p: 3,
        flex: { xs: 1, lg: 0 },
        "&:hover": {
          backgroundColor: "#f8f8fb",
        },
      }}
      onClick={() => navigate(nav)}
    >
      <Box
        sx={{
          display: { xs: " flex ", lg: "block" },
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="h6" fontWeight="bold">
          {titulo}
        </Typography>
        <KeyboardArrowDown
          fontSize="large"
          sx={{
            alignSelf: "center",
            display: { xs: "block ", lg: "none" },
          }}
          color={color}
        />
        <Typography
          variant="subtitle2"
          sx={{
            display: { xs: "none", lg: "block" },
          }}
        >
          {subtitulo}
        </Typography>
      </Box>
      <Box>
        <ArrowForwardIosSharp
          sx={{
            display: { xs: "none", lg: "block" },

            alignSelf: "center",
          }}
          color={color}
        />
      </Box>
    </Box>
  )
}
const Configuração = () => {
  return (
    <Box>
      <NavBar />
      <Container maxWidth="xl" sx={{ mt: 10 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} lg={4}>
            <Paper variant="outlined">
              <Box p={3}>
                <Typography variant="h5" fontWeight={"bold"}>
                  Configurações
                </Typography>
                <Typography
                  variant="subtitle1"
                  sx={{
                    display: { xs: "none", lg: "block" },
                  }}
                >
                  Gerencie todas as configurações da barbearia em um só lugar.
                </Typography>
              </Box>
              <Divider />
              <Box
                sx={{
                  display: { xs: "flex", lg: "block" },
                }}
              >
                <CardConfig
                  titulo="Empresa"
                  subtitulo="Gerencie definições como o nome da barbearia, horários e dias de funcionamento"
                  nav="dados"
                />
                <Divider />
                <CardConfig
                  titulo="Serviços"
                  subtitulo="Cadastre, edite e exclua os tipos de serviços disponíveis para agendamento"
                  nav="servicos"
                />
                <Divider />
                <CardConfig
                  titulo="Equipe"
                  subtitulo="Adicione, edite e exclua os membros da equipe."
                  nav="equipe"
                />
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} lg={8} mb={2}>
            <Paper variant="outlined">
              <Box>
                <Outlet />
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

export default Configuração
