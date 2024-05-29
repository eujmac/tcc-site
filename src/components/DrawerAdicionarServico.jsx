import Drawer from "@mui/material/Drawer"
import { Autocomplete, Box, Button, TextField, Typography } from "@mui/material"
import { useDrawer } from "../context/DrawerContext"
import { NumericFormat } from "react-number-format"
import { Controller, useForm } from "react-hook-form"
import { useEffect, useState } from "react"
import { db } from "../services/firebase"
import { push, ref, set } from "firebase/database"
import { useSnackbarGlobal } from "../context/SnackbarGlobalContext"

// const celularRegex =
//   /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/

// const dataNascimentoRegex =
//   /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/

export default function DrawerAdicionarServico() {
  const { isDrawerAdicionarServicoOpen, setIsDrawerAdicionarServicoOpen } =
    useDrawer()
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()

  const { handleClick, dispatch } = useSnackbarGlobal()

  const mostraSnackbar = tipoDispatch => {
    dispatch(tipoDispatch)
    handleClick()
  }

  useEffect(() => {
    reset({ nome: "", preco: "", tipo: "" })
  }, [])

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
      reset({ nome: "", preco: "", tipo: "" })
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
        reset({ nome: "", preco: "", tipo: "" })
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
          <Controller
            name="nome"
            control={control}
            rules={{ required: "Digite o nome do serviço" }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Nome"
                margin="normal"
                error={!!errors.nome}
                helperText={errors.nome ? errors.nome.message : ""}
              />
            )}
          />
          <Controller
            name="tipo"
            control={control}
            rules={{ required: "Selecione um tipo" }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <Autocomplete
                options={tipos}
                value={value}
                onChange={(event, newValue) => onChange(newValue)}
                renderInput={params => (
                  <TextField
                    margin="normal"
                    {...params}
                    label="Tipo do serviço"
                    error={!!error}
                    helperText={error ? error.message : ""}
                  />
                )}
              />
            )}
          />
          <Controller
            name="preco"
            control={control}
            defaultValue=""
            rules={{
              required: "Digite um preço",
              min: {
                value: 1,
                message: "Digite um preço",
              },
            }}
            render={({
              field: { onChange, onBlur, value },
              fieldState: { error },
            }) => (
              <NumericFormat
                customInput={TextField}
                value={value}
                onValueChange={values => {
                  onChange(values.value)
                }}
                onBlur={onBlur}
                label="Preço"
                margin="normal"
                allowNegative="false"
                fullWidth
                prefix="R$ "
                decimalScale={2}
                decimalSeparator="."
                error={!!error}
                helperText={error ? error.message : ""}
              />
            )}
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

const tipos = ["Barbearia", "Venda"]
