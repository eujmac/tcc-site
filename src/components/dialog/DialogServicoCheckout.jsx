import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material"
import { useDialog } from "../../context/DialogContext"

import { Close } from "@mui/icons-material"
import ListagemServicosCheckout from "../ListagemServicosCheckout"

const DialogServicoCheckout = () => {
  const { isDialogServicoCheckout, setIsDialogServicoCheckout } = useDialog()
  return (
    <Dialog
      sx={{
        "& .MuiDialogContent-root": {
          width: "550px",
          padding: "2rem",
        },
        "& .MuiDialogActions-root": {
          padding: "0",
        },
      }}
      open={isDialogServicoCheckout}
      onClose={() => setIsDialogServicoCheckout(false)}
    >
      <DialogTitle alignSelf="center" fontWeight="bold" fontSize="25px">
        Selecione um serviço
      </DialogTitle>
      <IconButton
        aria-label="delete"
        color="error"
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
        }}
        onClick={() => setIsDialogServicoCheckout(false)}
      >
        <Close fontSize="large" />
      </IconButton>
      <DialogContent>
        <ListagemServicosCheckout />
      </DialogContent>
    </Dialog>
  )
}

export default DialogServicoCheckout
