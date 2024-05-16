import { Box, Container, Grid, Paper, Stack, Typography } from "@mui/material"
import NavBar from "../components/NavBar"
import ListaCortes from "../components/ListaCortes"
const Home = () => {
  return (
    <Box>
      <NavBar />
      <Container maxWidth="xl" sx={{ mt: "2rem" }}>
        <Grid container spacing={2}>
          <Grid item xs={12} lg={6}>
            <Paper variant="outlined">
              <Stack>
                <Typography variant="h6" fontWeight={"bold"} p={3}>
                  Próximos agendamentos de hoje
                </Typography>
                <ListaCortes />
              </Stack>
            </Paper>
          </Grid>
          <Grid item xs={12} lg={6}>
            <Paper variant="outlined">
              <Stack>
                <Typography variant="h6" fontWeight={"bold"} p={3}>
                  Histórico de agendamentos
                </Typography>
                <ListaCortes />
              </Stack>
            </Paper>
          </Grid>
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
                  <Box>**GRÁFICO AQUI**</Box>
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
