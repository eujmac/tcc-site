import Drawer from "@mui/material/Drawer"
import { Box, Button, TextField, Typography } from "@mui/material"
import { useDrawer } from "../context/DrawerContext"

const celularRegex =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/

const dataNascimentoRegex =
  /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/

export default function DrawerTabela({ titulo }) {
  const { isDrawerTabelaOpen, setIsDrawerTabelaOpen } = useDrawer()
  return (
    <Drawer
      variant="temporary"
      anchor="right"
      open={isDrawerTabelaOpen}
      onClose={() => setIsDrawerTabelaOpen(false)}
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
              {titulo}
            </Typography>
          </Box>
        </Box>
        <Box p={3}>
          <TextField fullWidth type="text" label="Nome" name="nome" />
          <TextField
            fullWidth
            type="text"
            label="Data Nascimento"
            name="dataNascimento"
          />
          <TextField fullWidth type="text" label="Email" name="email" />
          <TextField fullWidth type="text" label="Celular" name="celular" />
          <Button
            variant="contained"
            fullWidth
            color="bgDark"
            sx={{ color: "white" }}
            onClick={() => setIsDrawerTabelaOpen(false)}
          >
            Adicionar
          </Button>
        </Box>
      </Box>
    </Drawer>
  )
}
