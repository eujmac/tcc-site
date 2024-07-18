import Drawer from "@mui/material/Drawer"
import { Box, Button, Grid, Tooltip, Typography } from "@mui/material"
import { useDrawer } from "../../context/DrawerContext"

import {
  Add,
  AttachMoney,
  CreditCard,
  DeleteForever,
} from "@mui/icons-material"
import { useEffect, useState } from "react"

import { useDialog } from "../../context/DialogContext"
import ListaServicosCheckout from "../ListaServicosCheckout"
import { useAgendaRealTime } from "../../context/AgendaRealTimeContext"
import { get, ref, update } from "firebase/database"
import { db } from "../../services/firebase"
import { format, parse } from "date-fns"
import { ptBR } from "date-fns/locale"
import { useSnackbarGlobal } from "../../context/SnackbarGlobalContext"

export default function DrawerCheckout() {
  const { isDrawerCheckoutOpen, setIsDrawerCheckoutOpen } = useDrawer()
  const { setIsDialogServicoCheckout } = useDialog()
  const [formaPagamentoSelecionada, setFormaPagamentoSelecionada] = useState()
  const {
    agendaRealTime,
    idAgendaRealtime,
    setServicosAgendaRealTime,
    calculaTotal,
    servicosAgendaRealTime,
  } = useAgendaRealTime()
  const [objAgenda, setObjAgenda] = useState({})
  const [dataFormatada, setDataFormatada] = useState("")
  const [valorTotal, setValorTotal] = useState("")
  const agendaRef = ref(db, `agenda/${idAgendaRealtime}`)
  const { mostraSnackbar } = useSnackbarGlobal()
  useEffect(() => {
    const getAgenda = async () => {
      const snapshot = await get(agendaRef)
      if (snapshot.exists()) {
        // popula os campos
        const obj = snapshot.val()
        setObjAgenda(obj)
        setFormaPagamentoSelecionada(
          obj.formaDePagamento ? obj.formaDePagamento : ""
        )
        if (!obj.data) return
        const date = parse(obj.data, "dd/MM/yyyy", new Date())
        setDataFormatada(
          format(date, "eeee, d 'de' MMMM", {
            locale: ptBR,
          })
        )
        setServicosAgendaRealTime(obj.servicos)
      }
    }
    getAgenda()
  }, [idAgendaRealtime, agendaRealTime])

  useEffect(() => {
    const total = calculaTotal()
    setValorTotal(total)
  }, [servicosAgendaRealTime, calculaTotal])

  const salvar = () => {
    try {
      if (servicosAgendaRealTime.length === 0) {
        mostraSnackbar("agendar.servicosVazio")
        return
      }
      setIsDrawerCheckoutOpen(false)
      update(agendaRef, {
        ...objAgenda,
        servicos: [...servicosAgendaRealTime],
        formaDePagamento: null,
      })
      setFormaPagamentoSelecionada("")
    } catch (error) {
      console.log(error)
    }
  }
  const checkout = () => {
    try {
      if (servicosAgendaRealTime.length === 0) {
        mostraSnackbar("agendar.servicosVazio")
        return
      }
      if (formaPagamentoSelecionada === "") {
        mostraSnackbar("checkout.formaDePagamento")
        return
      }
      setIsDrawerCheckoutOpen(false)
      update(agendaRef, {
        ...objAgenda,
        servicos: [...servicosAgendaRealTime],
        formaDePagamento: formaPagamentoSelecionada,
        status: "concluido",
      })
    } catch (error) {
      console.log(error)
    }
  }
  const cancelar = async () => {
    try {
      setIsDrawerCheckoutOpen(false)
      update(agendaRef, {
        ...objAgenda,
        servicos: [...servicosAgendaRealTime],
        formaDePagamento: null,
        status: "cancelado",
      })
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <Drawer
      variant="temporary"
      anchor="right"
      open={isDrawerCheckoutOpen}
      onClose={() => {
        setIsDrawerCheckoutOpen(false)
        setServicosAgendaRealTime(objAgenda.servicos)
        setFormaPagamentoSelecionada("")
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
          <ListaServicosCheckout />
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
          <Button
            sx={{ mt: 2 }}
            variant="outlined"
            startIcon={<Add />}
            color="bgDark"
            onClick={() => setIsDialogServicoCheckout(true)}
          >
            Adicionar Serviço
          </Button>
        </Box>
        <Box p={3} pt={0}>
          <Typography variant="h5" mb={2}>
            <b>Forma de pagamento</b>
          </Typography>
          <Grid container spacing={4} alignItems="center" justifyItems="center">
            <Grid item xs={6} lg={3}>
              <Button
                onClick={() => setFormaPagamentoSelecionada("dinheiro")}
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
            <Grid item xs={6} lg={3}>
              <Button
                onClick={() => setFormaPagamentoSelecionada("pix")}
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
            <Grid item xs={6} lg={3}>
              <Button
                onClick={() => setFormaPagamentoSelecionada("debito")}
                variant={
                  formaPagamentoSelecionada === "debito"
                    ? "contained"
                    : "outlined"
                }
                startIcon={<CreditCard />}
                sx={{ p: 4, width: "100%" }}
                color="success"
              >
                Débito
              </Button>
            </Grid>
            <Grid item xs={6} lg={3}>
              <Button
                onClick={() => setFormaPagamentoSelecionada("credito")}
                variant={
                  formaPagamentoSelecionada === "credito"
                    ? "contained"
                    : "outlined"
                }
                startIcon={<CreditCard />}
                sx={{ p: 4, width: "100%" }}
                color="success"
              >
                Crédito
              </Button>
            </Grid>
          </Grid>
          <Box display={"flex"} gap={1} mt={3}>
            <Tooltip title="Cancelar Agendamento">
              <Button variant="contained" color="error">
                <DeleteForever onClick={cancelar} />
              </Button>
            </Tooltip>
            <Button
              variant="contained"
              fullWidth
              color="bgDark"
              sx={{ color: "white" }}
              onClick={salvar}
            >
              salvar
            </Button>
            <Button
              variant="contained"
              fullWidth
              color="bgDark"
              sx={{ color: "white" }}
              onClick={checkout}
            >
              Checkout
            </Button>
          </Box>
        </Box>
      </Box>
    </Drawer>
  )
}
