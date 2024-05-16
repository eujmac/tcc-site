import { Box, Button, IconButton, Stack, Typography } from "@mui/material"
import { useDrawer } from "../context/DrawerContext"
import { Delete } from "@mui/icons-material"

const Servico = () => {
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
        <Typography alignSelf={"center"}>Corte de Cabelo Maquina</Typography>
        <Typography variant="h6" alignSelf={"center"} fontWeight={"bold"}>
          R$ 30{" "}
          <IconButton aria-label="delete" color="error" size="small">
            <Delete />
          </IconButton>
        </Typography>
      </Stack>
    </>
  )
}

export default Servico
