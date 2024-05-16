import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Container,
  Grid,
  Paper,
  Popover,
  Stack,
  Typography,
} from "@mui/material"
import NavBar from "../components/NavBar"
import { DateCalendar } from "@mui/x-date-pickers"
import { useState } from "react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import CalendarioPopover from "../components/CalendarioPopover"
import GridHorarios from "../components/GridHorarios"

const formataDataPeloTipo = (data, tipo) => {
  switch (tipo) {
    case 1:
      return format(data, "EEEE d LLLL, y", { locale: ptBR })
    default:
      break
  }
}
const Agendamento = () => {
  const [dataAtual, setDataAtual] = useState(new Date())

  return (
    <Box sx={{ zIndex: 1 }}>
      <NavBar />
      <Box
        sx={{
          bgcolor: "lightgray",
          width: "100%",
          height: "60px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ButtonGroup bgcolor="white" variant="contained">
          <Button onClick={() => setDataAtual(new Date())}>Hoje</Button>
          <CalendarioPopover
            dataAtual={dataAtual}
            setDataAtual={setDataAtual}
            data={formataDataPeloTipo(dataAtual, 1)}
          />
        </ButtonGroup>
      </Box>
      <Container maxWidth="xl" sx={{ mt: "1rem" }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
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
                  <Typography variant="h5">João marcos</Typography>
                </Stack>
                <Box>
                  <Typography variant="body1">
                    Selecione um horário de atendimento:
                  </Typography>
                </Box>
                <GridHorarios />
              </Stack>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
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
                  <Avatar sx={{ width: 50, height: 50 }}>P</Avatar>
                  <Typography variant="h5">Pedro Henrique</Typography>
                </Stack>
                <Box>
                  <Typography variant="body1">
                    Selecione um horário de atendimento:
                  </Typography>
                </Box>
                <GridHorarios />
              </Stack>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
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
                  <Avatar sx={{ width: 50, height: 50 }}>L</Avatar>
                  <Typography variant="h5">Lucas Fernando</Typography>
                </Stack>
                <Box>
                  <Typography variant="body1">
                    Selecione um horário de atendimento:
                  </Typography>
                </Box>
                refatorando código: removendo duplicidade e criando componentes
                <GridHorarios />
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

export default Agendamento
