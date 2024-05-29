import Drawer from "@mui/material/Drawer"
import { Autocomplete, Box, Button, TextField, Typography } from "@mui/material"
import { useDrawer } from "../context/DrawerContext"
import { NumericFormat } from "react-number-format"
import { Controller, useForm } from "react-hook-form"
import { useEffect, useState } from "react"
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
  const [tipo, setTipo] = useState(null)

  const {
    control,
    register,
    handleSubmit,
    reset,
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
        reset({ nomeServico: obj.nome, preco: obj.preco })
        setTipo(obj.tipo)
      }
    }
    getServico(id)
  }, [id, reset])

  const editar = dados => {
    try {
      const servicoRef = ref(db, `servicos/${id}`)
      update(servicoRef, {
        nome: dados.nomeServico,
        preco: dados.preco,
        tipo,
      })
      mostraSnackbar("sucessoEditar")
      setIsDrawerEditarServicoOpen(false)
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
        reset({ nomeServico: "", preco: "0" })
        setTipo(null)
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
          <TextField
            {...register("nomeServico", {
              required: "Digite o nome do serviço",
              minLength: {
                value: 5,
                message: "O nome do serviço deve ter no mínimo 5 dígitos",
              },
            })}
            error={!!errors.nomeServico}
            helperText={errors.nomeServico?.message}
            fullWidth
            type="text"
            label="Nome"
            margin="normal"
          />
          <Autocomplete
            value={tipo}
            onChange={(event, newValue) => {
              setTipo(newValue)
            }}
            options={tipos}
            renderInput={params => (
              <TextField {...params} label="Tipo do serviço" margin="normal" />
            )}
          />
          <Controller
            control={control}
            name="preco"
            render={({ field: { onChange, onBlur, value, errors } }) => (
              <NumericFormat
                customInput={TextField}
                value={value}
                onValueChange={v => {
                  onChange(parseFloat(v.value))
                }}
                // helperText={errors.nomeServico?.message}
                onBlur={onBlur}
                label="Preço"
                margin="normal"
                allowNegative="false"
                fullWidth
                prefix="R$ "
                decimalScale={2}
                decimalSeparator="."
              />
            )}
          />

          <Button
            variant="contained"
            type="submit"
            fullWidth
            color="bgDark"
            sx={{ color: "white", mt: 2 }}
            // onClick={() => setIsDrawerTabelaOpen(false)}
          >
            salvar
          </Button>
        </Box>
      </Box>
    </Drawer>
  )
}

const tipos = ["Barbearia", "Venda"]
