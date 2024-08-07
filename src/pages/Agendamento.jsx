import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Container,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material"
import NavBar from "../components/NavBar"
import { useState } from "react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import CalendarioPopover from "../components/calendario/CalendarioPopover"
import GridHorarios from "../components/GridHorarios"
import { useEffect } from "react"
import { useEquipe } from "../context/EquipeContext"
import { useAgendaRealTime } from "../context/AgendaRealTimeContext"

const formataDataPeloTipo = (data, tipo) => {
  switch (tipo) {
    case 1:
      return format(data, "EEEE d LLLL, y", { locale: ptBR })
    default:
      break
  }
}

const CardBarbeiro = ({ nome, foto, isLoading, id, dataAtual }) => {
  return (
    <Grid item xs={12} md={6}>
      <Paper variant="outlined">
        <Stack spacing={2} p={2}>
          <Stack
            sx={{
              py: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Avatar srcSet={foto} sx={{ width: 60, height: 60 }}>
              {nome[0].toUpperCase()}
            </Avatar>
            <Typography variant="h5">{nome}</Typography>
          </Stack>
          <Box>
            <Typography variant="body1">
              Selecione um horário de atendimento:
            </Typography>
          </Box>
          <GridHorarios isLoading={isLoading} id={id} dataAtual={dataAtual} />
        </Stack>
      </Paper>
    </Grid>
  )
}
const Agendamento = () => {
  const [dataAtual, setDataAtual] = useState(new Date())
  const [isLoading, setIsLoading] = useState(false)
  const { equipeRealTime } = useEquipe()
  const { agendaRealTime } = useAgendaRealTime()
  useEffect(() => {
    setIsLoading(true)
    const timeout = setTimeout(() => {
      setIsLoading(false)
    }, 500)

    return () => {
      clearTimeout(timeout)
    }
  }, [dataAtual, agendaRealTime])
  return (
    <Box>
      <NavBar />
      {/* Header com calendário */}
      <Box
        sx={{
          bgcolor: "cinza.main",
          width: "100%",
          p: 2,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "sticky",
          top: 64,
          zIndex: 1,
        }}
      >
        <ButtonGroup variant="contained">
          <Button onClick={() => setDataAtual(new Date())}>Hoje</Button>
          <CalendarioPopover
            dataAtual={dataAtual}
            setDataAtual={setDataAtual}
            data={formataDataPeloTipo(dataAtual, 1)}
          />
        </ButtonGroup>
      </Box>
      {/* Grid com os barbeiros e os horários */}
      <Container maxWidth="xl" sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          {equipeRealTime.map(item => (
            <CardBarbeiro
              key={item.id}
              id={item.id}
              foto={item.foto}
              nome={item.nome}
              isLoading={isLoading}
              dataAtual={dataAtual}
            />
          ))}
        </Grid>
      </Container>
    </Box>
  )
}

export default Agendamento
