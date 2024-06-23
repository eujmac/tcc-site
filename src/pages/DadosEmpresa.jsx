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
import AutocompleteEmpresa from "../components/textfields/AutocompleteEmpresa"

const DadosEmpresa = () => {
  const { user } = useAuth()
  const { mostraSnackbar } = useSnackbarGlobal()
  const { nomeBarbeariaRealTime, diasRealTime, horasRealTime, isLoading } =
    useBarbearia()
  const {
    register,
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      senhaNova: "",
      senhaAtual: "",
    },
  })

  useEffect(() => {
    setValue("nome", nomeBarbeariaRealTime)
    setValue("dias", diasRealTime)
    setValue("horas", horasRealTime)
  }, [nomeBarbeariaRealTime, diasRealTime, horasRealTime, setValue])

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
        if (
          (dados.email.length == 0 || dados.senhaNova.length == 0) &&
          dados.senhaAtual.length > 1
        ) {
          mostraSnackbar("dadosEmpresa.errorEmailSenhaVazio")
        }
        if (dados.email.length > 1) {
          await updateEmail(user, dados.email)
          mostraSnackbar("sucesso")
          salvar(dados)
        }
        if (dados.senhaNova.length > 1) {
          await updatePassword(user, dados.senhaNova)
          mostraSnackbar("sucesso")
          salvar(dados)
        }
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
    } else if (
      (dados.email.length > 1 || dados.senhaNova.length > 1) &&
      dados.senhaAtual.length === 0
    ) {
      mostraSnackbar("dadosEmpresa.errorDigiteSenhaAtual")
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
            titulo="Informações da barbearia"
            subtitulo="O nome da barbearia é exibido em diversas áreas, incluindo na
            barra de navegação, na aba do navegador e dentro do aplicativo."
          />
          <Controller
            name="nome"
            control={control}
            rules={{ required: "Digite o nome da barbearia" }}
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
        <AutocompleteEmpresa
          name={"dias"}
          control={control}
          options={diasOptions}
          label={"Dias da semana"}
        />
        <AutocompleteEmpresa
          name={"horas"}
          control={control}
          options={horasOptions}
          label={"Horas"}
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
