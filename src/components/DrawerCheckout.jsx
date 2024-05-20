import Drawer from "@mui/material/Drawer"
import {
  Autocomplete,
  Box,
  Button,
  Grid,
  TextField,
  Tooltip,
  Typography,
  lighten,
  styled,
} from "@mui/material"
import { useDrawer } from "../context/DrawerContext"
import ListaServicos from "./ListaServicos"
import {
  Add,
  AttachMoney,
  CreditCard,
  DeleteForever,
} from "@mui/icons-material"
import { useState } from "react"

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
const nomes = [
  { nome: "Antonio" },
  { nome: "João Marcos" },
  { nome: "Pedro Henrique" },
  { nome: "John Sow" },
  { nome: "Fernando" },
  { nome: "Lucas" },
]

export default function DrawerCheckout() {
  const { isDrawerCheckoutOpen, setIsDrawerCheckoutOpen } = useDrawer()
  const [formaPagamentoSelecionada, setFormaPagamentoSelecionada] =
    useState("dinheiro")

  const options = nomes.map(option => {
    const firstLetter = option.nome[0].toUpperCase()
    return {
      firstLetter: /[0-9]/.test(firstLetter) ? "0-9" : firstLetter,
      ...option,
    }
  })
  return (
    <Drawer
      variant="temporary"
      anchor="right"
      open={isDrawerCheckoutOpen}
      onClose={() => setIsDrawerCheckoutOpen(false)}
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
              Segunda-feira, 99 maio
            </Typography>
            <Typography variant="h6" color="white">
              10:00
            </Typography>
          </Box>
        </Box>
        <Box p={3} display={"flex"} gap={4} alignItems="center">
          <Typography variant="h5">Cliente</Typography>
          <Autocomplete
            id="grouped-demo"
            options={options.sort(
              (a, b) => -b.firstLetter.localeCompare(a.firstLetter)
            )}
            groupBy={option => option.firstLetter}
            getOptionLabel={option => option.nome}
            sx={{ width: "100%" }}
            renderInput={params => <TextField {...params} label="" />}
            renderGroup={params => (
              <li key={params.key}>
                <GroupHeader>{params.group}</GroupHeader>
                <GroupItems>{params.children}</GroupItems>
              </li>
            )}
          />
        </Box>
        <Box p={3} pt={0}>
          <Typography variant="h5">Serviços</Typography>
          <ListaServicos />
          <Button
            sx={{ mt: 2 }}
            variant="outlined"
            startIcon={<Add />}
            color="bgDark"
          >
            Adicionar Serviço
          </Button>
        </Box>
        <Box p={3} pt={0}>
          <Typography variant="h5" mb={2}>
            Formas de pagamento
          </Typography>
          <Grid container spacing={4} alignItems="center" justifyItems="center">
            <Grid item xs={6}>
              <Button
                onClick={() => setFormaPagamentoSelecionada("dinheiro")}
                variant={
                  formaPagamentoSelecionada === "dinheiro"
                    ? "contained"
                    : "outlined"
                }
                startIcon={<AttachMoney />}
                sx={{ p: 5, width: "100%" }}
                color="success"
              >
                Dinheiro
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                onClick={() => setFormaPagamentoSelecionada("pix")}
                variant={
                  formaPagamentoSelecionada === "pix" ? "contained" : "outlined"
                }
                startIcon={<AttachMoney />}
                sx={{ p: 5, width: "100%" }}
                color="success"
              >
                Pix
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                onClick={() => setFormaPagamentoSelecionada("debito")}
                variant={
                  formaPagamentoSelecionada === "debito"
                    ? "contained"
                    : "outlined"
                }
                startIcon={<CreditCard />}
                sx={{ p: 5, width: "100%" }}
                color="success"
              >
                Cartão Débito
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                onClick={() => setFormaPagamentoSelecionada("credito")}
                variant={
                  formaPagamentoSelecionada === "credito"
                    ? "contained"
                    : "outlined"
                }
                startIcon={<CreditCard />}
                sx={{ p: 5, width: "100%" }}
                color="success"
              >
                Cartão Crédito
              </Button>
            </Grid>
          </Grid>
          <Box display={"flex"} gap={2} mt={3}>
            <Tooltip title="Cancelar Corte">
              <Button variant="contained" color="error">
                <DeleteForever onClick={() => setIsDrawerCheckoutOpen(false)} />
              </Button>
            </Tooltip>
            <Button
              variant="contained"
              fullWidth
              color="bgDark"
              sx={{ color: "white" }}
              onClick={() => setIsDrawerCheckoutOpen(false)}
            >
              Checkout
            </Button>
          </Box>
        </Box>
      </Box>
    </Drawer>
  )
}
