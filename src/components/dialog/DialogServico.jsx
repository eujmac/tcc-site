import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material"
import { useDialog } from "../../context/DialogContext"

import { Close } from "@mui/icons-material"
import ListagemServicos from "./../ListagemServicos"

const DialogServico = () => {
  const { isDialogServico, setIsDialogServico } = useDialog()
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
      open={isDialogServico}
      onClose={() => setIsDialogServico(false)}
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
        onClick={() => setIsDialogServico(false)}
      >
        <Close fontSize="large" />
      </IconButton>
      <DialogContent>
        <ListagemServicos />
      </DialogContent>
    </Dialog>
  )
}

export default DialogServico
