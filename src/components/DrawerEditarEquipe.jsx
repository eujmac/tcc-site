import Drawer from "@mui/material/Drawer"
import { Autocomplete, Box, Button, TextField, Typography } from "@mui/material"
import { useDrawer } from "../context/DrawerContext"
import { NumericFormat } from "react-number-format"
import { Controller, useForm } from "react-hook-form"
import { useEffect } from "react"
import { db } from "../services/firebase"
import { get, ref, update } from "firebase/database"
import { useSnackbarGlobal } from "../context/SnackbarGlobalContext"
import { useId } from "../context/IdContext"

// const celularRegex =
//   /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/

// const dataNascimentoRegex =
//   /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/

export default function DrawerEditarServico() {
  const { isDrawerEditarServicoOpen, setIsDrawerEditarServicoOpen } =
    useDrawer()

  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const { handleClick, dispatch } = useSnackbarGlobal()
  const { id } = useId()

  const mostraSnackbar = tipoDispatch => {
    dispatch(tipoDispatch)
    handleClick()
  }

  useEffect(() => {
    const getServico = async id => {
      const dbRef = ref(db, `servicos/${id}`)
      const snapshot = await get(dbRef)
      if (snapshot.exists()) {
        // popula os campos
        const obj = snapshot.val()
        setValue("nome", obj.nome)
        setValue("preco", obj.preco)
        setValue("tipo", obj.tipo)
      }
    }
    getServico(id)
  }, [id, setValue])

  const editar = dados => {
    try {
      const servicoRef = ref(db, `servicos/${id}`)
      update(servicoRef, {
        nome: dados.nome,
        preco: dados.preco,
        tipo: dados.tipo,
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
            Edite nome de serviço, tipo e o seu preço.
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
            salvar
          </Button>
        </Box>
      </Box>
    </Drawer>
  )
}

const tipos = ["Barbearia", "Venda"]
