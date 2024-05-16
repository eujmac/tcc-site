import Drawer from "@mui/material/Drawer"
import {
  Box,
  Button,
  ButtonGroup,
  ClickAwayListener,
  IconButton,
  Typography,
} from "@mui/material"
import { useDrawer } from "../context/DrawerContext"
import ListaCortes from "./ListaCortes"
import ListaServicos from "./ListaServicos"
import { DeleteForever } from "@mui/icons-material"

export default function DrawerCheckout() {
  const { isDrawerOpen, setIsDrawerOpen } = useDrawer()
  return (
    <Drawer
      variant="temporary"
      anchor="right"
      open={isDrawerOpen}
      onClose={() => setIsDrawerOpen(false)}
      height={"100%"}
    >
      <Box width="50vw" role="presentation">
        <Box
          sx={{
            height: "120px",
            bgcolor: "primary.main",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
          p={4}
        >
          <Box>
            <Typography variant="h4" color="white">
              Quinta, 14 maio
            </Typography>
            <Typography variant="h6" color="white">
              14:00
            </Typography>
          </Box>
        </Box>
        <Box p={4} display={"flex"} gap={4}>
          <Typography variant="h5">Cliente</Typography>
          <Typography variant="h5">**input procurar cliente**</Typography>
        </Box>
        <Box p={4}>
          <Typography variant="h5">Serviços</Typography>
          <ListaServicos />
          <Box display={"flex"} gap={2} py={2}>
            <Button variant="contained" color="error">
              <DeleteForever />
            </Button>
            <Button variant="contained" fullWidth color="success">
              Checkout
            </Button>
          </Box>
        </Box>
      </Box>
    </Drawer>
  )
}
