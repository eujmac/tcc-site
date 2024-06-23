import {
  Avatar,
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material"
import NavBar from "../components/NavBar"
import { AttachMoney, ContentCut, People } from "@mui/icons-material"
import { useCliente } from "../context/ClienteContext"
import { useServicos } from "../context/ServicosContext"
import { useEquipe } from "../context/EquipeContext"
import { useAgendaRealTime } from "../context/AgendaRealTimeContext"
import GraficoLinha from "./../components/grafico/GraficoLinha"
import GraficoBarraDia from "../components/grafico/GraficoBarraDia"
import GraficoBarraMes from "../components/grafico/GraficoBarraMes"
const CardDashboard = ({ titulo, valor, icon }) => {
  return (
    <Card sx={{ height: 140 }}>
      <CardContent>
        <Box
          direction="row"
          sx={{
            display: "flex",
            height: "100%",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
          spacing={3}
        >
          <Box
            sx={{
              display: "flex",
              height: "100%",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="h6">{titulo}</Typography>
            <Avatar
              sx={{
                height: "40px",
                width: "40px",
                backgroundColor: "primary.main",
              }}
            >
              {icon}
            </Avatar>
          </Box>
          <Typography variant="h4" sx={{ justifySelf: "flex-end" }}>
            {valor}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  )
}
const CardGraficoLinhaAgendamentosSemana = () => {
  return (
    <Card sx={{ height: 500 }}>
      <CardContent>
        <Stack display={"flex"} justifyContent={"space-between"}>
          <Typography variant="h5" fontWeight={"bold"}>
            Agendamentos recentes
          </Typography>
          <Typography variant="body2">Últimos 7 dias</Typography>
        </Stack>
        <Box height={420}>
          <GraficoLinha />
        </Box>
      </CardContent>
    </Card>
  )
}
const CardGraficoBarraAgendamentosPorDia = () => {
  return (
    <Card sx={{ height: 500 }}>
      <CardContent>
        <Stack display={"flex"} justifyContent={"space-between"}>
          <Typography variant="h5" fontWeight={"bold"}>
            Valores recebidos
          </Typography>
          <Typography variant="body2">Últimos 7 dias</Typography>
        </Stack>
        <Box height={420}>
          <GraficoBarraDia />
        </Box>
      </CardContent>
    </Card>
  )
}
const CardGraficoBarraAgendamentosPorMes = () => {
  return (
    <Card sx={{ height: 500 }}>
      <CardContent>
        <Stack display={"flex"} justifyContent={"space-between"}>
          <Typography variant="h5" fontWeight={"bold"}>
            Valores recebidos
          </Typography>
          <Typography variant="body2">Último ano</Typography>
        </Stack>
        <Box height={420}>
          <GraficoBarraMes />
        </Box>
      </CardContent>
    </Card>
  )
}
const Dashboard = () => {
  const { clientesRealTime } = useCliente()
  const { servicosRealTime } = useServicos()
  const { equipeRealTime } = useEquipe()
  const { agendaRealTime, contagemDeStatus, total, total30Dias } =
    useAgendaRealTime()
  return (
    <Box>
      <NavBar />
      <Container maxWidth="xl" sx={{ mt: 10, mb: 2 }}>
        <Paper variant="outlined">
          <Box p={2}>
            <Grid container spacing={2} rowGap={2}>
              {/* Card agendamento de hoje */}
              <Grid item xs={12} md={6} lg={3}>
                <CardDashboard
                  titulo="Clientes"
                  valor={clientesRealTime.length || 0}
                  icon={<People />}
                />
              </Grid>
              <Grid item xs={12} md={6} lg={3}>
                <CardDashboard
                  titulo="Serviços"
                  valor={servicosRealTime.length || 0}
                  icon={<ContentCut />}
                />
              </Grid>
              <Grid item xs={12} md={6} lg={3}>
                <CardDashboard
                  titulo="Barbeiros"
                  valor={equipeRealTime.length || 0}
                  icon={<People />}
                />
              </Grid>
              <Grid item xs={12} md={6} lg={3}>
                <CardDashboard
                  titulo="Total Agendamentos"
                  valor={agendaRealTime.length || 0}
                  icon={<ContentCut />}
                />
              </Grid>
              <Grid item xs={12} md={6} lg={3}>
                <CardDashboard
                  titulo="Agendamentos Concluídos"
                  valor={contagemDeStatus.concluido}
                  icon={<ContentCut />}
                />
              </Grid>
              <Grid item xs={12} md={6} lg={3}>
                <CardDashboard
                  titulo="Agendamentos Cancelados"
                  valor={contagemDeStatus.cancelado}
                  icon={<ContentCut />}
                />
              </Grid>
              <Grid item xs={12} md={6} lg={3}>
                <CardDashboard
                  titulo="Valor Recebido (Total)"
                  valor={`R$ ${total}`}
                  icon={<AttachMoney />}
                />
              </Grid>
              <Grid item xs={12} md={6} lg={3}>
                <CardDashboard
                  titulo="Valor Recebido (30 Dias)"
                  valor={`R$ ${total30Dias}`}
                  icon={<AttachMoney />}
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <CardGraficoLinhaAgendamentosSemana />
              </Grid>
              <Grid item xs={12} lg={6}>
                <CardGraficoBarraAgendamentosPorDia />
              </Grid>
              <Grid item xs={12}>
                <CardGraficoBarraAgendamentosPorMes />
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Container>
    </Box>
  )
}

export default Dashboard
