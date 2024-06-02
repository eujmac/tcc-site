import Drawer from "@mui/material/Drawer"
import { Box, Button, TextField, Typography } from "@mui/material"
import { useDrawer } from "../../context/DrawerContext"

import { Controller, useForm } from "react-hook-form"
import { db } from "../../services/firebase"
import { push, ref, set } from "firebase/database"
import { useSnackbarGlobal } from "../../context/SnackbarGlobalContext"
import InputMask from "react-input-mask"
import TextfieldNome from "../textfields/TextfieldNome"
import TextfieldDataNascimento from "../textfields/TextfieldDataNascimento"
import TextfieldEmail from "../textfields/TextfieldEmail"
import TextfieldCelular from "../textfields/TextfieldCelular"

export default function DrawerAdicionarCliente() {
  const { isDrawerAdicionarClienteOpen, setIsDrawerAdicionarClienteOpen } =
    useDrawer()
  const {
    control,
    reset,
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

  const { handleClick, dispatch } = useSnackbarGlobal()

  const mostraSnackbar = tipoDispatch => {
    dispatch(tipoDispatch)
    handleClick()
  }

  const adicionar = async dados => {
    try {
      const clientesListRef = ref(db, "clientes")
      const newClientesRef = push(clientesListRef)
      // verificar se o barbeiro já existe

      set(newClientesRef, {
        nome: dados.nome,
        data_nascimento: dados.data_nascimento,
        email: dados.email,
        telefone: dados.celular,
      })
      setIsDrawerAdicionarClienteOpen(false)
      mostraSnackbar("sucessoAdicionar")
      reset()
    } catch (error) {
      console.log(error)
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
            Adicione o nome do cliente, data de nascimento, email, celular e
            escolha a sua foto
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
