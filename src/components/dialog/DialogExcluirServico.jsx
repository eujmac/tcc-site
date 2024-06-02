import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@mui/material"
import { useDialog } from "../../context/DialogContext"
import { useEffect, useState } from "react"
import { get, ref, remove } from "firebase/database"
import { db } from "../../services/firebase"
import { useId } from "../../context/IdContext"
import { useSnackbarGlobal } from "../../context/SnackbarGlobalContext"
import { useServicos } from "../../context/ServicosContext"

const DialogExcluirServico = () => {
  const { servicosRealTime } = useServicos()
  const { isDialogServicoOpen, setIsDialogServicoOpen } = useDialog()
  const [nome, setNome] = useState("")
  const { id } = useId()
  const { handleClick, dispatch } = useSnackbarGlobal()

  useEffect(() => {
    const getServico = async id => {
      if (id) {
        const dbRef = ref(db, `servicos/${id}`)
        const snapshot = await get(dbRef)
        setNome(snapshot.val().nome)
      }
    }
    getServico(id)
  }, [id, servicosRealTime])

  const mostraSnackbar = tipoDispatch => {
    dispatch(tipoDispatch)
    handleClick()
  }
  const deletar = async () => {
    try {
      const servicoRef = ref(db, `servicos/${id}`)
      remove(servicoRef)
      setIsDialogServicoOpen(false)
      mostraSnackbar("sucessoExcluir")
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
      open={isDialogServicoOpen}
      onClose={() => setIsDialogServicoOpen(false)}
    >
      <DialogTitle alignSelf="center" fontWeight="bold">
        Deletar serviço?
      </DialogTitle>
      <DialogContent>
        <DialogContentText mb={2} color="black">
          Você tem certeza que deseja deletar o serviço &quot;{nome}&quot;?
        </DialogContentText>
        <Alert severity="warning">Cuidado. Essa ação é irreversível.</Alert>
        <DialogActions sx={{ mt: 3 }}>
          <Button
            color="bgDark"
            sx={{ color: "white" }}
            variant="contained"
            onClick={() => setIsDialogServicoOpen(false)}
            fullWidth
          >
            Cancelar
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={deletar}
            fullWidth
            autoFocus
          >
            Excluir
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  )
}

export default DialogExcluirServico
