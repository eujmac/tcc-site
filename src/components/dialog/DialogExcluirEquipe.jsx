import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material"
import { useDialog } from "../../context/DialogContext"
import { useEffect, useState } from "react"
import { get, ref, remove } from "firebase/database"
import { db } from "../../services/firebase"
import { useId } from "../../context/IdContext"
import { useSnackbarGlobal } from "../../context/SnackbarGlobalContext"
import { useEquipe } from "../../context/EquipeContext"

const DialogExcluirEquipe = () => {
  const { equipeRealTime } = useEquipe()

  const { isDialogExcluirEquipeOpen, setIsDialogExcluirEquipeOpen } =
    useDialog()
  const [nome, setNome] = useState(null)
  const { id, idTabela } = useId()

  const { mostraSnackbar } = useSnackbarGlobal()

  useEffect(() => {
    const getEquipe = async id => {
      const dbRef = ref(db, `equipe/${id}`)
      if (idTabela === "equipe") {
        const snapshot = await get(dbRef)
        const obj = snapshot.val()
        setNome(obj.nome)
      }
    }
    getEquipe(id)
  }, [id, equipeRealTime, idTabela])

  const deletar = async () => {
    try {
      const equipeRef = ref(db, `equipe/${id}`)
      remove(equipeRef)
      setIsDialogExcluirEquipeOpen(false)
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
      open={isDialogExcluirEquipeOpen}
      onClose={() => setIsDialogExcluirEquipeOpen(false)}
    >
      <DialogTitle alignSelf="center" fontWeight="bold">
        Deletar barbeiro?
      </DialogTitle>
      <DialogContent>
        <DialogContentText mb={2} color="black">
          Você tem certeza que deseja deletar o barbeiro &quot;{nome}&quot;?
        </DialogContentText>
        <Alert severity="warning">Cuidado. Essa ação é irreversível.</Alert>
        <DialogActions sx={{ mt: 3 }}>
          <Button
            color="bgDark"
            sx={{ color: "white" }}
            variant="contained"
            onClick={() => setIsDialogExcluirEquipeOpen(false)}
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

export default DialogExcluirEquipe
