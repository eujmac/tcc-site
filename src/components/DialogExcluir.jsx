import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material"
import { useDialog } from "../context/DialogContext"

const DialogExcluir = ({ titulo, mensagem }) => {
  const { isDialogOpen, setIsDialogOpen } = useDialog()
  return (
    <>
      <Dialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{titulo}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {mensagem}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDialogOpen(false)}>Cancelar</Button>
          <Button onClick={() => setIsDialogOpen(false)} autoFocus>
            Excluir
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default DialogExcluir
