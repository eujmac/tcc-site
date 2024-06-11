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
import TextfieldTipo from "../textfields/TextfieldTipo"
import TextfieldPreco from "../textfields/TextfieldPreco"

export default function DrawerEditarServico() {
  const { isDrawerEditarServicoOpen, setIsDrawerEditarServicoOpen } =
    useDrawer()

  const {
    control,
    setValue,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      tipo: "Barbearia",
      nome: "",
      preco: "",
    },
  })

  const { mostraSnackbar } = useSnackbarGlobal()
  const { id } = useId()

  useEffect(() => {
    const getServico = async id => {
      const dbRef = ref(db, `servicos/${id}`)
      const snapshot = await get(dbRef)
      if (snapshot.exists()) {
        // popula os campos
        const obj = snapshot.val()
        setValue("tipo", obj.tipo)
        setValue("nome", obj.nome)
        setValue("preco", obj.preco)
      }
    }
    getServico(id)
  }, [id, setValue])

  const editar = dados => {
    try {
      const servicoRef = ref(db, `servicos/${id}`)
      update(servicoRef, {
        tipo: dados.tipo,
        nome: dados.nome,
        preco: dados.preco,
      })
      setIsDrawerEditarServicoOpen(false)
      mostraSnackbar("sucessoEditar")
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <Drawer
      variant="temporary"
      anchor="right"
      open={isDrawerEditarServicoOpen}
      onClose={() => {
        setIsDrawerEditarServicoOpen(false)
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
              Editar serviço.
            </Typography>
          </Box>
        </Box>
        <Box p={3} component="form" onSubmit={handleSubmit(editar)} noValidate>
          <Typography variant="h5">Informações Básicas</Typography>
          <Typography variant="subtitle2">
            Edite o nome, tipo e o preço do serviço.
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
            salvar
          </Button>
        </Box>
      </Box>
    </Drawer>
  )
}

const tipos = ["Barbearia", "Venda"]
