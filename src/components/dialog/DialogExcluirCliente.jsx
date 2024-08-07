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
import { useCliente } from "../../context/ClienteContext"

const DialogExcluirCliente = () => {
  const { clientesRealTime } = useCliente()
  const { isDialogExcluirClienteOpen, setIsDialogExcluirClienteOpen } =
    useDialog()
  const [nome, setNome] = useState("")
  const { id, idTabela } = useId()
  const { mostraSnackbar } = useSnackbarGlobal()
  useEffect(() => {
    const getCliente = async id => {
      const dbRef = ref(db, `clientes/${id}`)
      if (idTabela === "clientes") {
        const snapshot = await get(dbRef)
        setNome(snapshot.val().nome)
      }
    }
    getCliente(id)
  }, [id, clientesRealTime, idTabela])

  const deletar = async () => {
    try {
      const clienteRef = ref(db, `clientes/${id}`)
      remove(clienteRef)
      setIsDialogExcluirClienteOpen(false)
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
      open={isDialogExcluirClienteOpen}
      onClose={() => setIsDialogExcluirClienteOpen(false)}
    >
      <DialogTitle alignSelf="center" fontWeight="bold">
        Deletar cliente?
      </DialogTitle>
      <DialogContent>
        <DialogContentText mb={2} color="black">
          Você tem certeza que deseja deletar o cliente{" "}
          <b>&quot;{nome}&quot;</b>?
        </DialogContentText>
        <Alert severity="warning">Cuidado. Essa ação é irreversível.</Alert>
        <DialogActions sx={{ mt: 3 }}>
          <Button
            color="bgDark"
            sx={{ color: "white" }}
            variant="contained"
            onClick={() => setIsDialogExcluirClienteOpen(false)}
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

export default DialogExcluirCliente
