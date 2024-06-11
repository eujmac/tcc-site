import { IconButton, Stack, Typography } from "@mui/material"
import { Delete } from "@mui/icons-material"
import { useAgendaRealTime } from "../context/AgendaRealTimeContext"

const ServicoCheckout = ({ servico, index }) => {
  const { deletarServico } = useAgendaRealTime()

  return (
    <>
      <Stack
        direction="row"
        display={"flex"}
        justifyContent={"space-between"}
        sx={{
          py: 2,
          "&:hover": {
            backgroundColor: "#f8f8fb",
          },
        }}
      >
        <Typography alignSelf={"center"}>{servico.nome}</Typography>
        <Typography variant="h6" alignSelf={"center"} fontWeight={"bold"}>
          R$ {servico.preco}
          <IconButton
            aria-label="delete"
            color="error"
            size="small"
            onClick={() => deletarServico(index)}
          >
            <Delete />
          </IconButton>
        </Typography>
      </Stack>
    </>
  )
}

export default ServicoCheckout
