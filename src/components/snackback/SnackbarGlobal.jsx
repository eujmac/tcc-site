import { Alert, Snackbar } from "@mui/material"
import { useSnackbarGlobal } from "../../context/SnackbarGlobalContext"

const SnackbarGlobal = () => {
  const { open, handleClose, state } = useSnackbarGlobal()
  return (
    <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
      <Alert
        onClose={handleClose}
        severity={state.tipo}
        variant="filled"
        sx={{ width: "100%" }}
      >
        {state.mensagem}
      </Alert>
    </Snackbar>
  )
}

export default SnackbarGlobal
