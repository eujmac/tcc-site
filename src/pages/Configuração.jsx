import { Box, Container, Paper, Typography } from "@mui/material"
import NavBar from "../components/NavBar"
const Configuração = () => {
  return (
    <Box>
      <NavBar />
      <Container maxWidth="xl" sx={{ mt: "2rem" }}>
        <Paper variant="outlined" p={2}>
          <Typography>abc</Typography>
        </Paper>
      </Container>
    </Box>
  )
}

export default Configuração
