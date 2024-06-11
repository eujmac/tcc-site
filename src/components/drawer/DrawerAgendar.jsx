import Drawer from "@mui/material/Drawer"
import {
  Autocomplete,
  Box,
  Button,
  TextField,
  Typography,
  lighten,
  styled,
} from "@mui/material"
import { useDrawer } from "../../context/DrawerContext"

import { Add } from "@mui/icons-material"
import { useAgendaLocal } from "../../context/AgendaLocalContext"
import { format, parse } from "date-fns"
import { ptBR } from "date-fns/locale"
import { useCliente } from "../../context/ClienteContext"
import { Controller, useForm } from "react-hook-form"
import { useDialog } from "../../context/DialogContext"
import ListaServicosAgenda from "../ListaServicosAgenda"
import { push, ref, set } from "firebase/database"
import { db } from "../../services/firebase"
import { useSnackbarGlobal } from "../../context/SnackbarGlobalContext"

const GroupHeader = styled("div")(({ theme }) => ({
  position: "sticky",
  top: "-8px",
  padding: "4px 10px",
  color: theme.palette.cinza.main,
  backgroundColor: lighten(theme.palette.cinza.main, 0.85),
}))

const GroupItems = styled("ul")({
  padding: 0,
})

export default function DrawerAgendar() {
  const { isDrawerAgendarOpen, setIsDrawerAgendarOpen } = useDrawer()
  const { setIsDialogServico } = useDialog()
  const {
    dataAgendaLocal,
    horaAgendaLocal,
    servicosAgendaLocal,
    setServicosAgendaLocal,
    barbeiro,
  } = useAgendaLocal()
  const { clientesRealTime } = useCliente()
  const { mostraSnackbar } = useSnackbarGlobal()

  const date = parse(dataAgendaLocal, "dd/MM/yyyy", new Date())
  const formattedDate = format(date, "eeee, d 'de' MMMM", { locale: ptBR })

  const options = clientesRealTime.map(option => {
    const firstLetter = option.nome[0].toUpperCase()
    return {
      firstLetter: /[0-9]/.test(firstLetter) ? "0-9" : firstLetter,
      ...option,
    }
  })
  const {
    control,
    setValue,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      cliente: { nome: "Escolha um cliente" },
    },
  })
  const handleForm = dados => {
    delete dados["cliente"]["firstLetter"]

    const objAgenda = {
      status: "agendado",
      cliente: { ...dados["cliente"] },
      barbeiro,
      data: dataAgendaLocal,
      hora: horaAgendaLocal,
      servicos: servicosAgendaLocal,
    }
    if (objAgenda.servicos.length === 0) {
      mostraSnackbar("agendar.servicosVazio")
      return
    }
    const agendaRef = ref(db, "agenda")
    const newAgendaRef = push(agendaRef)
    set(newAgendaRef, objAgenda)
    setIsDrawerAgendarOpen(false)
    setServicosAgendaLocal([])
    reset()
    mostraSnackbar("sucessoAdicionar")
  }
  return (
    <Drawer
      variant="temporary"
      anchor="right"
      open={isDrawerAgendarOpen}
      onClose={() => {
        setIsDrawerAgendarOpen(false)
        setServicosAgendaLocal([])
        reset()
      }}
      height={"100%"}
    >
      <Box
        width="50vw"
        role="presentation"
        component={"form"}
        onSubmit={handleSubmit(handleForm)}
        noValidate
      >
        <Box
          sx={{
            height: "100px",
            bgcolor: "primary.main",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
          p={4}
        >
          <Box>
            <Typography variant="h4" color="white">
              {formattedDate}
            </Typography>
            <Typography variant="h6" color="white">
              {horaAgendaLocal}
            </Typography>
          </Box>
        </Box>
        <Box px={3} pt={2} display={"flex"} gap={2} alignItems="center">
          <Typography variant="h5">
            <b>Barbeiro</b>:
          </Typography>
          <Typography variant="h5">{barbeiro.nome}</Typography>
        </Box>
        <Box px={3} py={2} display={"flex"} gap={4} alignItems="center" mt={0}>
          <Typography alignSelf="start" variant="h5">
            <b>Cliente</b>:
          </Typography>
          <Controller
            name="cliente"
            control={control}
            rules={{
              required: "Por favor, escolha um cliente.",
              validate: value =>
                value.nome !== "Escolha um cliente" ||
                "Por favor, escolha um cliente.",
            }}
            render={({ field: { onChange, value } }) => (
              <Autocomplete
                value={value}
                onChange={(event, newValue) => {
                  onChange(newValue)
                }}
                options={options.sort(
                  (a, b) => -b.firstLetter.localeCompare(a.firstLetter)
                )}
                groupBy={option => option.firstLetter}
                getOptionLabel={option => option.nome}
                sx={{ width: "100%" }}
                renderInput={params => (
                  <TextField
                    {...params}
                    label=""
                    error={!!errors.cliente}
                    helperText={errors.cliente ? errors.cliente.message : null}
                  />
                )}
                renderGroup={params => (
                  <li key={params.key}>
                    <GroupHeader>{params.group}</GroupHeader>
                    <GroupItems>{params.children}</GroupItems>
                  </li>
                )}
                isOptionEqualToValue={(option, value) => option.id === value.id}
              />
            )}
          />
        </Box>
        <Box p={3} pt={0}>
          <Typography variant="h5">
            <b>Serviços</b>
          </Typography>
          <ListaServicosAgenda />
          <Button
            sx={{ mt: 2 }}
            variant="outlined"
            startIcon={<Add />}
            color="bgDark"
            onClick={() => setIsDialogServico(true)}
          >
            Adicionar Serviço
          </Button>
        </Box>
        <Box p={3} pt={0}>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            color="bgDark"
            sx={{ color: "white" }}
          >
            Agendar
          </Button>
        </Box>
      </Box>
    </Drawer>
  )
}
