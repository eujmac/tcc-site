import { Box, Stack, Typography } from "@mui/material"

const Corte = () => {
  return (
    <Stack
      direction="row"
      spacing={1}
      display={"flex"}
      justifyContent={"space-between"}
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
        <Typography variant="h6">R$ 40</Typography>
      </Box>
    </Stack>
  )
}

export default Corte
