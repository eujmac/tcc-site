import { Box, Container, Divider, Grid, Paper, Typography } from "@mui/material"
import NavBar from "../components/NavBar"
import { ArrowForwardIosSharp } from "@mui/icons-material"
import { Outlet, useLocation, useNavigate } from "react-router-dom"

const CardConfig = ({ titulo, subtitulo, nav }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const color = location.pathname.includes(nav) ? "primary" : "inherit"

  return (
    <Box
      direction="row"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      sx={{
        cursor: "pointer",
        p: 3,
        "&:hover": {
          backgroundColor: "#f8f8fb",
        },
      }}
      onClick={() => navigate(nav)}
    >
      <Box>
        <Typography variant="h6" fontWeight="bold">
          {titulo}
        </Typography>
        <Typography variant="subtitle2">{subtitulo}</Typography>
      </Box>
      <Box>
        <ArrowForwardIosSharp
          sx={{
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
                  Configurações da empresa
                </Typography>
                <Typography variant="subtitle1">
                  Gerencie todas as configurações em um só lugar.
                </Typography>
              </Box>
              <Divider />
              <CardConfig
                titulo="Empresa"
                subtitulo="Gerencie definições como o nome da barbearia, horários e dias de
          funcionamento"
                nav="dados"
              />
              <Divider />
              <CardConfig
                titulo="Serviços"
                subtitulo="Cadastre, edite e exclua os tipos de serviços disponíveis"
                nav="servicos"
              />
              <Divider />
              <CardConfig
                titulo="Equipe"
                subtitulo="Cadastre, edite e exclua os colaboradores da barbearia"
                nav="equipe"
              />
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
