import { Box, Typography } from "@mui/material"
import { ArrowForwardIosSharp } from "@mui/icons-material"
import { useDialog } from "../context/DialogContext"
import { useAgendaRealTime } from "../context/AgendaRealTimeContext"

const ServicoAgendaListagemCheckout = ({ nome, preco, servico }) => {
  const { setIsDialogServicoCheckout } = useDialog()
  const { adicionarServico } = useAgendaRealTime()

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      sx={{
        cursor: "pointer",
        p: 2,
        flex: { xs: 1, lg: 0 },
        "&:hover": {
          backgroundColor: "#f8f8fb",
        },
      }}
      onClick={() => {
        setIsDialogServicoCheckout(false)
        adicionarServico(servico)
      }}
    >
      <Box
        sx={{
          display: { xs: " flex ", lg: "block" },
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="h6" fontWeight="bold">
          {nome}
        </Typography>
      </Box>
      <Box display={"flex"} gap={1}>
        <Typography variant="h6" fontWeight="bold">
          R$ {preco}
        </Typography>
        <ArrowForwardIosSharp
          sx={{
            alignSelf: "center",
          }}
        />
      </Box>
    </Box>
  )
}

export default ServicoAgendaListagemCheckout
