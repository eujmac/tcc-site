import { IconButton, Stack, Typography } from "@mui/material"
import { Delete } from "@mui/icons-material"
import { useAgendaLocal } from "../context/AgendaLocalContext"

const Servico = ({ servico, index }) => {
  const { deletarServico } = useAgendaLocal()

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
        <Typography alignSelf={"center"}>{servico.nome || abc}</Typography>
        <Typography variant="h6" alignSelf={"center"} fontWeight={"bold"}>
          R$ {servico.preco || 99}
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

export default Servico
