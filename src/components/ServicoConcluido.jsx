import { Stack, Typography } from "@mui/material"

const ServicoConcluido = ({ servico }) => {
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
        </Typography>
      </Stack>
    </>
  )
}

export default ServicoConcluido
