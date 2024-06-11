import { Box, Button, Chip, CircularProgress } from "@mui/material"
import { useDrawer } from "../context/DrawerContext"
import { horasOptions } from "../utils/dados"
import { useAgendaLocal } from "../context/AgendaLocalContext"
import { useBarbearia } from "../context/BarbeariaContext"
import { get, ref } from "firebase/database"
import { db } from "../services/firebase"
import { useAgendaRealTime } from "../context/AgendaRealTimeContext"
import { format } from "date-fns"
import { useEffect, useState } from "react"
import { ca, ptBR } from "date-fns/locale"

const ButtonRealTime = ({ horaButton, idBarbeiro, dataAtual }) => {
  function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1)
  }
  let diaDaSemana = format(dataAtual, "eee", { locale: ptBR })
  diaDaSemana = capitalizeFirstLetter(diaDaSemana)
  dataAtual = format(dataAtual, "dd/MM/yyyy")
  const { horasRealTime, diasRealTime } = useBarbearia()
  const {
    setIsDrawerAgendarOpen,
    setIsDrawerCheckoutOpen,
    setIsDrawerConcluidoOpen,
  } = useDrawer()
  const { setDataAgendaLocal, setHoraAgendaLocal, setBarbeiro } =
    useAgendaLocal()
  const { agendaRealTime, setIdAgendaRealtime } = useAgendaRealTime()
  const [achouAgendado, setAchouAgendado] = useState(false)
  const [achouCancelado, setAchouCancelado] = useState(false)
  const [achouConcluido, setAchouConcluido] = useState(false)
  const [idAgenda, setIdAgenda] = useState("")

  useEffect(() => {
    agendaRealTime.map(item => {
      if (
        item.barbeiro.id === idBarbeiro &&
        item.data === dataAtual &&
        item.hora === horaButton
      ) {
        if (item.status === "agendado") {
          setAchouAgendado(true)
        }
        if (item.status === "concluido") {
          setAchouConcluido(true)
        }
        if (item.status === "cancelado") {
          setAchouCancelado(true)
        }
        setIdAgenda(item.id)
      }
    })
  }, [agendaRealTime, dataAtual, horaButton, idBarbeiro, setIdAgendaRealtime])

  const handleClick = async () => {
    // teste concluido
    if (achouConcluido) {
      setIsDrawerConcluidoOpen(true)
      setIdAgendaRealtime(idAgenda)
      return
    }
    // teste agendado
    if (achouAgendado) {
      setIsDrawerCheckoutOpen(true)
      setIdAgendaRealtime(idAgenda)
      return
    }
    if (achouCancelado) {
      // resto livre
      const dbRef = ref(db, `equipe/${idBarbeiro}`)
      const snapshot = await get(dbRef)
      const novoObjBarbeiro = {
        id: snapshot.key,
        ...snapshot.val(),
      }
      setBarbeiro(novoObjBarbeiro)
      setDataAgendaLocal(dataAtual)
      setHoraAgendaLocal(horaButton)
      setIsDrawerAgendarOpen(true)
      return
    }
    // resto livre
    const dbRef = ref(db, `equipe/${idBarbeiro}`)
    const snapshot = await get(dbRef)
    const novoObjBarbeiro = {
      id: snapshot.key,
      ...snapshot.val(),
    }
    setBarbeiro(novoObjBarbeiro)
    setDataAgendaLocal(dataAtual)
    setHoraAgendaLocal(horaButton)
    setIsDrawerAgendarOpen(true)
  }

  return (
    <Button
      variant={achouConcluido ? "contained" : "outlined"}
      color={achouConcluido ? "success" : achouAgendado ? "error" : "success"}
      onClick={handleClick}
      disabled={
        !diasRealTime.includes(diaDaSemana) ||
        !horasRealTime.includes(horaButton)
      }
    >
      {horaButton}
    </Button>
  )
}

const GridHorarios = ({ isLoading, id, dataAtual }) => {
  return (
    <>
      {isLoading ? (
        <CircularProgress color="primary" sx={{ alignSelf: "center" }} />
      ) : (
        <>
          <Box display="flex" flexWrap="wrap" gap={2}>
            {horasOptions.map(hora => (
              <Box key={hora}>
                <ButtonRealTime
                  horaButton={hora}
                  idBarbeiro={id}
                  dataAtual={dataAtual}
                />
              </Box>
            ))}
          </Box>
          <Box display="flex" gap={2}>
            <Chip label="Indisponível" size="small" sx={{ fontSize: 12 }} />
            <Chip
              variant="outlined"
              label="Livre"
              size="small"
              color="success"
              sx={{ fontSize: 12 }}
            />
            <Chip
              variant="outlined"
              label="Agendado"
              size="small"
              color="error"
              sx={{ fontSize: 12 }}
            />
            <Chip
              label="Concluído"
              size="small"
              color="success"
              sx={{ fontSize: 12 }}
            />
          </Box>
        </>
      )}
    </>
  )
}

export default GridHorarios
