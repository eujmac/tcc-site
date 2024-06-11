import Drawer from "@mui/material/Drawer"
import { Box, Button, Grid, Typography } from "@mui/material"
import { useDrawer } from "../../context/DrawerContext"

import { AttachMoney, CreditCard } from "@mui/icons-material"
import { useEffect, useState } from "react"

import { useAgendaRealTime } from "../../context/AgendaRealTimeContext"
import { get, ref } from "firebase/database"
import { db } from "../../services/firebase"
import { format, parse } from "date-fns"
import { ptBR } from "date-fns/locale"
import ListaServicosConcluido from "../ListaServicosConcluido"

export default function DrawerConcluido() {
  const { isDrawerConcluidoOpen, setIsDrawerConcluidoOpen } = useDrawer()

  const {
    agendaRealTime,
    idAgendaRealtime,
    setServicosAgendaRealTime,
    calculaTotal,
    servicosAgendaRealTime,
  } = useAgendaRealTime()

  const [objAgenda, setObjAgenda] = useState({})
  const [dataFormatada, setDataFormatada] = useState("")
  const [formaPagamentoSelecionada, setFormaPagamentoSelecionada] = useState("")
  const [valorTotal, setValorTotal] = useState("")
  const agendaRef = ref(db, `agenda/${idAgendaRealtime}`)

  useEffect(() => {
    const getAgenda = async () => {
      const snapshot = await get(agendaRef)
      if (snapshot.exists()) {
        // popula os campos
        const obj = snapshot.val()
        setObjAgenda(obj)
        setFormaPagamentoSelecionada(obj.formaDePagamento)
        const date = parse(obj.data, "dd/MM/yyyy", new Date())
        setDataFormatada(
          format(date, "eeee, d 'de' MMMM", {
            locale: ptBR,
          })
        )
      }
    }
    getAgenda()
  }, [idAgendaRealtime, agendaRealTime])

  useEffect(() => {
    const total = calculaTotal()
    setValorTotal(total)
  }, [servicosAgendaRealTime, calculaTotal])

  return (
    <Drawer
      variant="temporary"
      anchor="right"
      open={isDrawerConcluidoOpen}
      onClose={() => {
        setIsDrawerConcluidoOpen(false)
        setServicosAgendaRealTime(objAgenda.servicos)
      }}
      height={"100%"}
    >
      <Box width="50vw" role="presentation">
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
              {dataFormatada}
            </Typography>
            <Typography variant="h6" color="white">
              {objAgenda.hora}
            </Typography>
          </Box>
        </Box>
        <Box px={3} pt={2} display={"flex"} gap={4} alignItems="center">
          <Typography variant="h5">
            <b>Barbeiro</b>: {objAgenda?.barbeiro?.nome}
          </Typography>
        </Box>
        <Box px={3} py={2} display={"flex"} gap={4} alignItems="center" mt={0}>
          <Typography variant="h5">
            <b>Cliente</b>: {objAgenda?.cliente?.nome}
          </Typography>
        </Box>
        <Box p={3} pt={0}>
          <Typography variant="h5">
            <b>Serviços</b>
          </Typography>
          <ListaServicosConcluido />
          {servicosAgendaRealTime?.length !== 0 && (
            <Box display="flex" justifyContent="space-between">
              <Typography mt={1} variant="h6">
                Total:{" "}
              </Typography>
              <Typography mt={1} variant="h6">
                <b>R$ {valorTotal}</b>
              </Typography>
            </Box>
          )}
        </Box>
        <Box p={3} pt={0}>
          <Typography variant="h5" mb={2}>
            <b>Forma de pagamento</b>
          </Typography>
          <Grid container spacing={4} alignItems="center" justifyItems="center">
            <Grid item xs={6}>
              <Button
                variant={
                  formaPagamentoSelecionada === "dinheiro"
                    ? "contained"
                    : "outlined"
                }
                startIcon={<AttachMoney />}
                sx={{ p: 4, width: "100%" }}
                color="success"
              >
                Dinheiro
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                variant={
                  formaPagamentoSelecionada === "pix" ? "contained" : "outlined"
                }
                startIcon={<AttachMoney />}
                sx={{ p: 4, width: "100%" }}
                color="success"
              >
                Pix
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                variant={
                  formaPagamentoSelecionada === "debito"
                    ? "contained"
                    : "outlined"
                }
                startIcon={<CreditCard />}
                sx={{ p: 4, width: "100%" }}
                color="success"
              >
                Cartão Débito
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                variant={
                  formaPagamentoSelecionada === "credito"
                    ? "contained"
                    : "outlined"
                }
                startIcon={<CreditCard />}
                sx={{ p: 4, width: "100%" }}
                color="success"
              >
                Cartão Crédito
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Drawer>
  )
}
