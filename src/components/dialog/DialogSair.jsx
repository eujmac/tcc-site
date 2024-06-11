import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material"
import { useDialog } from "../../context/DialogContext"
import { signOut } from "firebase/auth"
import { auth } from "../../services/firebase"

const DialogSair = () => {
  const { isDialogSair, setIsDialogSair } = useDialog()
  const sairDaConta = async () => {
    try {
      await signOut(auth)
      setIsDialogSair(false)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <Dialog
      sx={{
        "& .MuiDialogContent-root": {
          padding: "2rem",
        },
        "& .MuiDialogActions-root": {
          padding: "0",
        },
      }}
      open={isDialogSair}
      onClose={() => setIsDialogSair(false)}
    >
      <DialogTitle alignSelf="center" fontWeight="bold">
        Sair da conta?
      </DialogTitle>
      <DialogContent>
        <DialogContentText mb={2} color="black">
          Você tem certeza que deseja sair?
        </DialogContentText>
        <DialogActions sx={{ mt: 3 }}>
          <Button
            color="bgDark"
            sx={{ color: "white" }}
            variant="contained"
            onClick={() => setIsDialogSair(false)}
            fullWidth
          >
            Cancelar
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={sairDaConta}
            fullWidth
            autoFocus
          >
            sair
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  )
}

export default DialogSair
