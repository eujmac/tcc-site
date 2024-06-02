import Drawer from "@mui/material/Drawer"
import { Autocomplete, Box, Button, TextField, Typography } from "@mui/material"
import { useDrawer } from "../../context/DrawerContext"

import { NumericFormat } from "react-number-format"
import { Controller, useForm } from "react-hook-form"
import { useEffect } from "react"
import { db } from "../../services/firebase"
import { push, ref, set } from "firebase/database"
import { useSnackbarGlobal } from "../../context/SnackbarGlobalContext"
import TextfieldNome from "../textfields/TextfieldNome"
import TextfieldTipo from "../textfields/TextfieldTipo"
import TextfieldPreco from "../textfields/TextfieldPreco"

export default function DrawerAdicionarServico() {
  const { isDrawerAdicionarServicoOpen, setIsDrawerAdicionarServicoOpen } =
    useDrawer()
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      nome: "",
      preco: "",
      tipo: "Barbearia",
    },
  })

  const { handleClick, dispatch } = useSnackbarGlobal()

  const mostraSnackbar = tipoDispatch => {
    dispatch(tipoDispatch)
    handleClick()
  }

  const adicionar = dados => {
    try {
      // verificar se o produto já existe
      const servicosListRef = ref(db, "servicos")
      const newServicosRef = push(servicosListRef)
      set(newServicosRef, {
        nome: dados.nome,
        preco: dados.preco,
        tipo: dados.tipo,
      })
      setIsDrawerAdicionarServicoOpen(false)
      reset()
      mostraSnackbar("sucessoAdicionar")
    } catch (error) {
      console.log(error)
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
            Adicione um nome de serviço, escolha o seu tipo e digite o seu
            preço.
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
