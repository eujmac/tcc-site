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
import { format, isBefore, isFuture, parse, subDays } from "date-fns"
import { useAgendaRealTime } from "../context/AgendaRealTimeContext"
import { ptBR } from "date-fns/locale"

const Corte = ({ id, data, hora, status, servicos, barbeiro, cliente }) => {
  const { setIsDrawerCheckoutOpen, setIsDrawerConcluidoOpen } = useDrawer()
  const { setIdAgendaRealtime } = useAgendaRealTime()
  const parsedDate = parse(data, "dd/MM/yyyy", new Date())
  const calculaTotal = servicos => {
    const somaTotal = servicos.reduce((acumulador, servico) => {
      return acumulador + parseFloat(servico.preco)
    }, 0)
    return somaTotal
  }
  const handleClick = () => {
    // teste concluido
    if (status === "concluido" || status === "cancelado") {
      setIsDrawerConcluidoOpen(true)
      setIdAgendaRealtime(id)
      return
    }
    // teste agendado
    if (status === "agendado") {
      setIsDrawerCheckoutOpen(true)
      setIdAgendaRealtime(id)
      return
    }
  }
  return (
    <Box
      sx={{
        display: "flex",
        cursor: "pointer",
        p: 1,
        "&:hover": {
          backgroundColor: "#f8f8fb",
        },
      }}
      onClick={handleClick}
    >
      <Box
        sx={{
          width: 50,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          pr: 1,
        }}
      >
        <Typography variant="body2" fontWeight="bold">
          {format(parsedDate, "dd", { locale: ptBR })}
        </Typography>
        <Typography variant="body2" fontWeight="bold">
          {format(parsedDate, "MMM", { locale: ptBR })}
        </Typography>
      </Box>
      <Box
        sx={{
          flex: 1,
        }}
      >
        <Box sx={{ display: "flex" }}>
          <Typography>
            {format(parsedDate, "EEE, dd MMM yyyy", { locale: ptBR })} {hora}
          </Typography>
          <Typography
            ml={1}
            variant="caption"
            sx={{
              color:
                status === "cancelado"
                  ? "red"
                  : status === "agendado"
                  ? "green"
                  : "gray",
            }}
          >
            {status}
          </Typography>
        </Box>
        <Typography variant="subtitle2">
          <b>Barbeiro</b>: {barbeiro.nome}
        </Typography>
        <Typography variant="subtitle2">
          <b>Cliente</b>: {cliente.nome}
        </Typography>
      </Box>
      <Box display="flex" gap={1}>
        <Typography
          variant="h6"
          fontWeight={"bold"}
          sx={{ alignSelf: "center" }}
        >
          R$ {calculaTotal(servicos)}
        </Typography>
        <ArrowForwardIosSharp sx={{ alignSelf: "center" }} />
      </Box>
    </Box>
  )
}

const CardAgendamentosDeHoje = () => {
  const dataAtual = format(new Date(), "dd/MM/yyyy")
  const dataAtualBrasil = parse(dataAtual, "dd/MM/yyyy", new Date())
  const dataAtualBrasilFormatada = format(dataAtualBrasil, "dd/MM/yyyy", {
    locale: ptBR,
  })
  const { agendaRealTime } = useAgendaRealTime()
  const agenda = [...agendaRealTime]
  const sortByHora = (a, b) => {
    // Transformar as strings de hora em objetos Date
    const horaA = new Date(`1970-01-01T${a.hora}:00`)
    const horaB = new Date(`1970-01-01T${b.hora}:00`)

    // Comparar as horas e retornar o resultado
    return horaA - horaB
  }
  agenda.sort(sortByHora)
  return (
    <Paper variant="outlined">
      <Stack height="480px" overflow="auto">
        <Box
          sx={{
            position: "sticky",
            top: 0,
            zIndex: 1,
            backgroundColor: "white",
          }}
        >
          <Typography variant="h6" fontWeight={"bold"} p={3}>
            Agendamentos de hoje
          </Typography>
          <Divider />
        </Box>
        {agenda.map(item => {
          if (item.data === dataAtualBrasilFormatada) {
            return (
              <Box key={item.id}>
                <Corte
                  id={item.id}
                  data={item.data}
                  hora={item.hora}
                  status={item.status}
                  servicos={item.servicos}
                  valor={item.valor}
                  barbeiro={item.barbeiro}
                  cliente={item.cliente}
                />
                <Divider />
              </Box>
            )
          }
        })}
      </Stack>
    </Paper>
  )
}
const CardHistorico = () => {
  const { agendaRealTime } = useAgendaRealTime()
  const agenda = [...agendaRealTime]
  const hoje = new Date()
  const yesterday = subDays(hoje, 1)
  const dadosPassados = agenda
    .filter(item => {
      const parsedDate = parse(item.data, "dd/MM/yyyy", new Date())
      return isBefore(parsedDate, yesterday)
    })
    .sort((a, b) => {
      const dataA = parse(a.data, "dd/MM/yyyy", new Date())
      const dataB = parse(b.data, "dd/MM/yyyy", new Date())
      return dataB - dataA
    })

  return (
    <Paper variant="outlined">
      <Stack height="480px" overflow="auto">
        <Box
          sx={{
            position: "sticky",
            top: 0,
            zIndex: 1,
            backgroundColor: "white",
          }}
        >
          <Typography variant="h6" fontWeight={"bold"} p={3}>
            Histórico de agendamentos
          </Typography>
          <Divider />
        </Box>
        {dadosPassados.map(item => {
          return (
            <Box key={item.id}>
              <Corte
                id={item.id}
                data={item.data}
                hora={item.hora}
                status={item.status}
                servicos={item.servicos}
                valor={item.valor}
                barbeiro={item.barbeiro}
                cliente={item.cliente}
              />
              <Divider />
            </Box>
          )
        })}
      </Stack>
    </Paper>
  )
}
const CardProximosAgendamentos = () => {
  const { agendaRealTime } = useAgendaRealTime()
  const agenda = [...agendaRealTime]
  const hoje = new Date()
  const dadosPassados = agenda
    .filter(item => {
      const data = parse(item.data, "dd/MM/yyyy", new Date())
      return isFuture(data, hoje)
    })
    .sort((a, b) => {
      const dataA = parse(a.data, "dd/MM/yyyy", new Date())
      const dataB = parse(b.data, "dd/MM/yyyy", new Date())
      return dataA - dataB
    })

  return (
    <Paper variant="outlined">
      <Stack height="480px" overflow="auto">
        <Box
          sx={{
            position: "sticky",
            top: 0,
            zIndex: 1,
            backgroundColor: "white",
          }}
        >
          <Typography variant="h6" fontWeight={"bold"} p={3}>
            Próximos agendamentos
          </Typography>
          <Divider />
        </Box>
        {dadosPassados.map(item => {
          return (
            <Box key={item.id}>
              <Corte
                id={item.id}
                data={item.data}
                hora={item.hora}
                status={item.status}
                servicos={item.servicos}
                valor={item.valor}
                barbeiro={item.barbeiro}
                cliente={item.cliente}
              />
              <Divider />
            </Box>
          )
        })}
      </Stack>
    </Paper>
  )
}
const Home = () => {
  return (
    <Box>
      <NavBar />
      <Container maxWidth="xl" sx={{ mt: 10, mb: 2 }}>
        <Grid container spacing={2}>
          {/* Card agendamento de hoje */}
          <Grid item xs={12} lg={6}>
            <CardAgendamentosDeHoje />
          </Grid>

          {/* Card próximos agendamento */}
          <Grid item xs={12} lg={6}>
            <CardProximosAgendamentos />
          </Grid>

          {/* Card Histórico agendamento */}
          <Grid item xs={12}>
            <CardHistorico />
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

export default Home
