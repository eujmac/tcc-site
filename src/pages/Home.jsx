import {
  Box,
  Container,
  Divider,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material"
import NavBar from "../components/NavBar"
import { useDrawer } from "../context/DrawerContext"
import { ArrowForwardIosSharp } from "@mui/icons-material"
import GraficoLinha from "../components/GraficoLinha"

const Corte = () => {
  const { setIsDrawerCheckoutOpen } = useDrawer()

  return (
    <Stack
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
      onClick={() => setIsDrawerCheckoutOpen(true)}
    >
      <Box>
        <Typography color={"gray"}>Ter, 14 mai 2024 18:00</Typography>
        <Typography fontWeight={"bold"}>Corte de cabelo</Typography>
      </Box>
      <Box>
        <Typography>
          <b>Cliente</b>: João
        </Typography>
        <Typography>
          <b>Barbeiro</b>: Pedro
        </Typography>
      </Box>
      <Box display="flex" gap="10px">
        <Typography variant="h6" fontWeight={"bold"}>
          R$ 40
        </Typography>
        <ArrowForwardIosSharp sx={{ alignSelf: "center" }} />
      </Box>
    </Stack>
  )
}
const ListaCortes = () => {
  return (
    <>
      <Corte />
      <Divider />
      <Corte />
      <Divider />
      <Corte />
      <Divider />
    </>
  )
}

const Card = ({ titulo }) => {
  return (
    <Paper variant="outlined">
      <Stack>
        <Typography variant="h6" fontWeight={"bold"} p={3}>
          {titulo}
        </Typography>
        <ListaCortes />
      </Stack>
    </Paper>
  )
}
const Home = () => {
  return (
    <Box>
      <NavBar />
      <Container maxWidth="xl" sx={{ mt: "2rem" }}>
        <Grid container spacing={2}>
          {/* Card próximos agendamento */}
          <Grid item xs={12} lg={6}>
            <Card titulo={"Próximos agendamentos de hoje"} />
          </Grid>

          {/* Card Histórico agendamento */}
          <Grid item xs={12} lg={6}>
            <Card titulo={"Histórico de agendamentos"} />
          </Grid>

          {/* Card Agendamentos Recentes - Gráfico */}
          <Grid item xs={12}>
            <Paper variant="outlined">
              <Stack>
                <Stack display={"flex"} justifyContent={"space-between"} p={3}>
                  <Typography variant="h6" fontWeight={"bold"}>
                    Agendamentos recentes
                  </Typography>
                  <Typography variant="body2">Últimos 7 dias</Typography>
                  <Typography variant="h3">R$ 1299,00</Typography>
                  <Typography>
                    Agendamentos: <b>20</b>
                  </Typography>
                  <Box height="50vh">
                    <GraficoLinha />
                  </Box>
                </Stack>
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

export default Home
