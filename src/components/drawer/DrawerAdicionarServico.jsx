import Drawer from "@mui/material/Drawer"
import { Box, Button, Typography } from "@mui/material"
import { useDrawer } from "../../context/DrawerContext"

import { useForm } from "react-hook-form"
import { db } from "../../services/firebase"
import { push, ref, set } from "firebase/database"
import { useSnackbarGlobal } from "../../context/SnackbarGlobalContext"
import TextfieldNome from "../textfields/TextfieldNome"
import TextfieldTipo from "../textfields/TextfieldTipo"
import TextfieldPreco from "../textfields/TextfieldPreco"
import { useServicos } from "../../context/ServicosContext"

export default function DrawerAdicionarServico() {
  const { isDrawerAdicionarServicoOpen, setIsDrawerAdicionarServicoOpen } =
    useDrawer()
  const { servicosRealTime } = useServicos()
  const {
    control,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      nome: "",
      preco: "",
      tipo: "Barbearia",
    },
  })

  const { mostraSnackbar } = useSnackbarGlobal()

  const adicionar = dados => {
    const objetoEncontrado = servicosRealTime.find(
      obj => obj.nome === dados.nome
    )

    if (objetoEncontrado) {
      if (objetoEncontrado.nome === dados.nome) {
        setError("nome", {
          type: "manual",
          message: "Nome do serviço já cadastrado",
        })
      }
    } else {
      try {
        const servicosListRef = ref(db, "servicos")
        const newServicosRef = push(servicosListRef)
        set(newServicosRef, {
          nome: dados.nome,
          preco: parseFloat(dados.preco),
          tipo: dados.tipo,
        })
        setIsDrawerAdicionarServicoOpen(false)
        reset()
        mostraSnackbar("sucessoAdicionar")
      } catch (error) {
        console.log(error)
      }
    }
  }
  return (
    <Drawer
      variant="temporary"
      anchor="right"
      open={isDrawerAdicionarServicoOpen}
      onClose={() => {
        setIsDrawerAdicionarServicoOpen(false)
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
              Adicionar um novo serviço.
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
            Adicione um nome, escolha o seu tipo e digite o preço do serviço.
          </Typography>
          <TextfieldNome
            control={control}
            errors={errors}
            required="Digite o nome do serviço"
          />
          <TextfieldTipo control={control} errors={errors} />
          <TextfieldPreco control={control} errors={errors} />
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
