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
import CalendarioPopover from "../components/CalendarioPopover"
import GridHorarios from "../components/GridHorarios"
import { useEffect } from "react"

const formataDataPeloTipo = (data, tipo) => {
  switch (tipo) {
    case 1:
      return format(data, "EEEE d LLLL, y", { locale: ptBR })
    default:
      break
  }
}

const CardBarbeiro = ({ nome, isLoading }) => {
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
            <Avatar sx={{ width: 50, height: 50 }}>J</Avatar>
            <Typography variant="h5">{nome}</Typography>
          </Stack>
          <Box>
            <Typography variant="body1">
              Selecione um horário de atendimento:
            </Typography>
          </Box>
          <GridHorarios isLoading={isLoading} />
        </Stack>
      </Paper>
    </Grid>
  )
}
const Agendamento = () => {
  const [dataAtual, setDataAtual] = useState(new Date())
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)
    const timeout = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => {
      clearTimeout(timeout)
    }
  }, [dataAtual])

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
          <CardBarbeiro nome="João Marcos" isLoading={isLoading} />
          <CardBarbeiro nome="Pedro Henrique" isLoading={isLoading} />
          <CardBarbeiro nome="John Snow" isLoading={isLoading} />
        </Grid>
      </Container>
    </Box>
  )
}

export default Agendamento
