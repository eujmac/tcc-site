import Drawer from "@mui/material/Drawer"
import { Box, Button, Typography } from "@mui/material"
import { useDrawer } from "../../context/DrawerContext"

import { useForm } from "react-hook-form"
import { db } from "../../services/firebase"
import { push, ref, set } from "firebase/database"
import { useSnackbarGlobal } from "../../context/SnackbarGlobalContext"
import TextfieldNome from "../textfields/TextfieldNome"
import TextfieldDataNascimento from "../textfields/TextfieldDataNascimento"
import TextfieldEmail from "../textfields/TextfieldEmail"
import TextfieldCelular from "../textfields/TextfieldCelular"
import { useCliente } from "../../context/ClienteContext"

export default function DrawerAdicionarCliente() {
  const { isDrawerAdicionarClienteOpen, setIsDrawerAdicionarClienteOpen } =
    useDrawer()
  const { clientesRealTime } = useCliente()
  const {
    control,
    reset,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      nome: "",
      data_nascimento: "",
      email: "",
      celular: "",
    },
  })

  const { mostraSnackbar } = useSnackbarGlobal()

  const adicionar = async dados => {
    const objetoEncontrado = clientesRealTime.find(
      obj =>
        obj.nome === dados.nome ||
        obj.email === dados.email ||
        obj.celular === dados.celular
    )
    if (objetoEncontrado) {
      if (objetoEncontrado.nome === dados.nome) {
        setError("nome", {
          type: "manual",
          message: "Nome já cadastrado",
        })
      }
      if (objetoEncontrado.email === dados.email) {
        setError("email", {
          type: "manual",
          message: "E-mail já cadastrado",
        })
      }
      if (objetoEncontrado.celular === dados.celular) {
        setError("celular", {
          type: "manual",
          message: "Celular já cadastrado",
        })
      }
    } else {
      try {
        const clientesListRef = ref(db, "clientes")
        const newClientesRef = push(clientesListRef)
        set(newClientesRef, {
          nome: dados.nome,
          data_nascimento: dados.data_nascimento,
          email: dados.email,
          celular: dados.celular,
        })
        setIsDrawerAdicionarClienteOpen(false)
        mostraSnackbar("sucessoAdicionar")
        reset()
      } catch (error) {
        console.log(error)
      }
    }
  }
  return (
    <Drawer
      variant="temporary"
      anchor="right"
      open={isDrawerAdicionarClienteOpen}
      onClose={() => {
        setIsDrawerAdicionarClienteOpen(false)
        reset()
      }}
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
              Adicionar um novo cliente.
            </Typography>
          </Box>
        </Box>
        <Box
          p={3}
          component="form"
          onSubmit={handleSubmit(adicionar)}
          noValidate
        >
          <Typography variant="h5">Informações Básicas</Typography>
          <Typography variant="subtitle2">
            Adicione o nome, data de nascimento, e-mail, celular do cliente.
          </Typography>
          <TextfieldNome
            control={control}
            errors={errors}
            required="Digite o nome do cliente"
          />
          <TextfieldDataNascimento
            control={control}
            errors={errors}
            required="Digite a data de nascimento do cliente"
          />
          <TextfieldEmail
            control={control}
            errors={errors}
            required="Digite o e-mail do cliente"
          />
          <TextfieldCelular
            control={control}
            errors={errors}
            required="Digite o celular do cliente"
          />
          <Button
            variant="contained"
            type="submit"
            fullWidth
            color="bgDark"
            sx={{ color: "white", mt: 2 }}
          >
            Adicionar
          </Button>
        </Box>
      </Box>
    </Drawer>
  )
}
