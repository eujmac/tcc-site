import {
  Autocomplete,
  Box,
  Button,
  Chip,
  CircularProgress,
  Divider,
  TextField,
  Typography,
} from "@mui/material"
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updateEmail,
  updatePassword,
} from "firebase/auth"
import { Controller, useForm } from "react-hook-form"
import { useAuth } from "../context/AuthContext"
import { useEffect } from "react"
import { useSnackbarGlobal } from "../context/SnackbarGlobalContext"
import { useBarbearia } from "../context/BarbeariaContext"
import { ref, update } from "firebase/database"
import { db } from "../services/firebase"
import { diasOptions, horasOptions } from "../utils/dados"

const DadosEmpresa = () => {
  const { user } = useAuth()
  const { handleClick, dispatch } = useSnackbarGlobal()
  const { nomeBarbeariaRealTime, diasRealTime, horasRealTime, isLoading } =
    useBarbearia()
  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({})

  useEffect(() => {
    setValue("nome", nomeBarbeariaRealTime)
    setValue("dias", diasRealTime)
    setValue("horas", horasRealTime)
  }, [nomeBarbeariaRealTime, diasRealTime, horasRealTime, setValue])

  const mostraSnackbar = tipoDispatch => {
    dispatch(tipoDispatch)
    handleClick()
  }

  const salvar = async dados => {
    update(ref(db, "barbearia/-NyuqtGr_WyCGrmZk_oz"), {
      nome: dados.nome,
      diasFuncionamento: dados.dias,
      horasFuncionamento: dados.horas,
    })
  }

  const trocaEmailSenha = async dados => {
    try {
      const cred = EmailAuthProvider.credential(user.email, dados.senhaAtual)
      const auth = await reauthenticateWithCredential(user, cred)
      if (auth) {
        if (dados.email !== "") {
          await updateEmail(user, dados.email)
        }
        if (dados.senhaNova !== "") {
          await updatePassword(user, dados.senhaNova)
        }
        mostraSnackbar("sucesso")
        salvar(dados)
      }
    } catch (error) {
      if (error.code === "auth/wrong-password") {
        mostraSnackbar("dadosEmpresa.errorSenhaAtual")
      }

      console.log(error.code)
    }
  }
  const handleForm = async dados => {
    if (dados.senhaAtual.length > 1) {
      trocaEmailSenha(dados)
    } else if (dados.nome.length === 0) {
      mostraSnackbar("dadosEmpresa.errorNomeVazio")
    } else {
      salvar(dados)
      mostraSnackbar("sucesso")
    }
  }

  return (
    <Box component={"form"} onSubmit={handleSubmit(handleForm)} noValidate>
      <Box
        sx={{
          height: 136,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mx: 3,
        }}
      >
        <Typography variant="h4">Dados da Empresa</Typography>
        <Button type="submit" variant="contained">
          {isLoading ? (
            <CircularProgress
              color="inherit"
              size={24.5}
              sx={{ width: "40px" }}
            />
          ) : (
            "Salvar"
          )}
        </Button>
      </Box>
      <Divider />
      <Box>
        <Box m={3}>
          <TituloSubtitulo
            titulo="Informações da empresa"
            subtitulo="O nome da sua empresa é exibido em diversas áreas, incluindo na
            barra de navegação, na aba do navegador, e dentro do aplicativo."
          />
          <Controller
            name="nome"
            control={control}
            rules={{ required: false }}
            render={({ field: { onChange, value } }) => (
              <TextField
                fullWidth
                onChange={onChange}
                value={value || ""}
                label="Nome da Empresa"
                margin="normal"
                error={!!errors.nome}
                helperText={errors.nome ? errors.nome.message : ""}
              />
            )}
          />
        </Box>
      </Box>
      <Divider />
      <Box m={3}>
        <TituloSubtitulo
          titulo="Configurações de dias e horas de funcionamento"
          subtitulo="Escolha as horas e os dias onde a barbearia ira funcionar."
        />
        <Controller
          name="dias"
          control={control}
          rules={{ required: false }}
          render={({ field: { onChange, value } }) => (
            <Autocomplete
              multiple
              filterSelectedOptions
              options={diasOptions}
              value={value || []}
              getOptionLabel={option => option}
              isOptionEqualToValue={(option, value) => option === value}
              renderTags={(tagValue, getTagProps) =>
                tagValue.map((option, index) => {
                  const { key, ...rest } = getTagProps({ index })
                  return <Chip label={option} {...rest} key={key} />
                })
              }
              onChange={(event, newValue) => {
                onChange(newValue)
              }}
              renderInput={params => (
                <TextField {...params} label="Dias da semana" margin="normal" />
              )}
            />
          )}
        />
        <Controller
          name="horas"
          control={control}
          rules={{ required: false }}
          render={({ field: { onChange, value } }) => (
            <Autocomplete
              multiple
              filterSelectedOptions
              options={horasOptions}
              value={value || []}
              getOptionLabel={option => option}
              isOptionEqualToValue={(option, value) => option === value}
              renderTags={(tagValue, getTagProps) =>
                tagValue.map((option, index) => {
                  const { key, ...rest } = getTagProps({ index })
                  return <Chip label={option} {...rest} key={key} />
                })
              }
              onChange={(event, newValue) => {
                onChange(newValue)
              }}
              renderInput={params => (
                <TextField {...params} label="Horas" margin="normal" />
              )}
            />
          )}
        />
      </Box>
      <Divider />
      <Box m={3}>
        <TituloSubtitulo
          titulo="Configurações do login"
          subtitulo="Para a troca de email ou senha do login é preciso entrar com a
          senha atual, para validação."
        />
        <TextField
          {...register("senhaAtual", {
            required: false,
            minLength: {
              value: 6,
              message: "A senha deve conter no mínimo 6 dígitos",
            },
          })}
          error={!!errors.senhaAtual}
          helperText={errors.senhaAtual?.message}
          sx={{ my: 2 }}
          fullWidth
          required
          type="password"
          label="Senha Atual"
        />
        <TextField
          {...register("email", {
            required: false,
            pattern: {
              value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              message: "E-mail inválido",
            },
          })}
          error={!!errors.email}
          helperText={errors.email?.message}
          sx={{ my: 2 }}
          fullWidth
          type="text"
          label="Novo Email"
        />
        <TextField
          {...register("senhaNova", {
            required: false,
            minLength: {
              value: 6,
              message: "A senha deve conter no mínimo 6 dígitos",
            },
          })}
          error={!!errors.senhaNova}
          helperText={errors.senhaNova?.message}
          sx={{ my: 2 }}
          fullWidth
          type="password"
          label="Nova Senha"
        />
      </Box>
    </Box>
  )
}

const TituloSubtitulo = ({ titulo, subtitulo }) => {
  return (
    <>
      <Typography variant="h6" fontWeight="bold">
        {titulo}
      </Typography>
      <Typography variant="subtitle2">{subtitulo}</Typography>
    </>
  )
}

export default DadosEmpresa
