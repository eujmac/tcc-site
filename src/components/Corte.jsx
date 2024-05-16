import { Box, Stack, Typography } from "@mui/material"
import { useDrawer } from "../context/DrawerContext"

const Corte = () => {
  const { setIsDrawerOpen } = useDrawer()

  return (
    <Stack
      direction="row"
      display={"flex"}
      justifyContent={"space-between"}
      sx={{
        cursor: "pointer",
        p: 3,
        "&:hover": {
          backgroundColor: "#f8f8fb",
        },
      }}
      onClick={() => setIsDrawerOpen(true)}
    >
      <Box>
        <Typography color={"gray"}>Ter, 14 mai 2024 18:00</Typography>
        <Typography fontWeight={"bold"}>Corte de cabelo</Typography>
      </Box>
      <Box>
        <Typography>
          <b>Cliente</b>: João
        </Typography>
        <Typography>
          <b>Barbeiro</b>: Pedro
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyItems: "center",
        }}
      >
        <Typography variant="h6" alignSelf={"center"} fontWeight={"bold"}>
          R$ 40
        </Typography>
      </Box>
    </Stack>
  )
}

export default Corte
