import Drawer from "@mui/material/Drawer"
import { Box, Button, Typography } from "@mui/material"
import { useDrawer } from "../../context/DrawerContext"
import { useForm } from "react-hook-form"
import { useEffect } from "react"
import { db } from "../../services/firebase"
import { get, ref, update } from "firebase/database"
import { useSnackbarGlobal } from "../../context/SnackbarGlobalContext"
import { useId } from "../../context/IdContext"
import TextfieldNome from "../textfields/TextfieldNome"
import TextfieldDataNascimento from "../textfields/TextfieldDataNascimento"
import TextfieldEmail from "../textfields/TextfieldEmail"
import TextfieldCelular from "../textfields/TextfieldCelular"

export default function DrawerEditarCliente() {
  const { isDrawerEditarClienteOpen, setIsDrawerEditarClienteOpen } =
    useDrawer()
  const {
    control,
    setValue,
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
  const { id } = useId()

  useEffect(() => {
    const getCliente = async id => {
      const dbRef = ref(db, `clientes/${id}`)
      const snapshot = await get(dbRef)
      if (snapshot.exists()) {
        // popula os campos
        const obj = snapshot.val()
        setValue("nome", obj.nome)
        setValue("data_nascimento", obj.data_nascimento)
        setValue("email", obj.email)
        setValue("celular", obj.celular)
      }
    }
    getCliente(id)
  }, [id, setValue])

  const editar = dados => {
    try {
      const clienteRef = ref(db, `clientes/${id}`)
      update(clienteRef, {
        nome: dados.nome,
        email: dados.email,
        data_nascimento: dados.data_nascimento,
        celular: dados.celular,
      })
      setIsDrawerEditarClienteOpen(false)
      mostraSnackbar("sucessoEditar")
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <Drawer
      variant="temporary"
      anchor="right"
      open={isDrawerEditarClienteOpen}
      onClose={() => {
        setIsDrawerEditarClienteOpen(false)
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
              Editar Cliente
            </Typography>
          </Box>
        </Box>
        <Box p={3} component="form" onSubmit={handleSubmit(editar)} noValidate>
          <Typography variant="h5">Informações Básicas</Typography>
          <Typography variant="subtitle2">
            Edite o nome, data de nascimento, e-mail e celular do cliente.
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
            salvar
          </Button>
        </Box>
      </Box>
    </Drawer>
  )
}
