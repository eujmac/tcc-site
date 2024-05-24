import {
  Alert,
  Autocomplete,
  Box,
  Button,
  Divider,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material"
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updateEmail,
  updatePassword,
} from "firebase/auth"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { useAuth } from "../context/AuthContext"

const dias = [
  { dia: "Segunda" },
  { dia: "Terça" },
  { dia: "Quarta" },
  { dia: "Quinta" },
  { dia: "Sexta" },
  { dia: "Sábado" },
  { dia: "Domingo" },
]
const horas = [
  { hora: "07:00" },
  { hora: "08:00" },
  { hora: "09:00" },
  { hora: "10:00" },
  { hora: "11:00" },
  { hora: "12:00" },
  { hora: "13:00" },
  { hora: "14:00" },
  { hora: "15:00" },
  { hora: "16:00" },
  { hora: "17:00" },
  { hora: "18:00" },
  { hora: "19:00" },
  { hora: "20:00" },
  { hora: "21:00" },
  { hora: "22:00" },
]

const DadosEmpresa = () => {
  const { user } = useAuth()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const [open, setOpen] = useState(false)
  const [isError, setIsError] = useState(false)
  const [errorMessage, setErrorMessage] = useState(false)
  const handleClick = () => {
    setOpen(true)
  }

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return
    }

    setOpen(false)
  }

  const checkSenha = async dados => {
    // criando uma credencial para ser testada
    const cred = EmailAuthProvider.credential(user.email, dados.senhaAntiga)

    try {
      const autenticado = await reauthenticateWithCredential(user, cred)

      if (autenticado && dados.email === "" && dados.senhaNova === "") {
        throw new Error("vazio")
      }
    } catch (error) {
      if (error.code === "auth/invalid-credential") {
        setErrorMessage("Senha antiga incorreta!")
        setIsError(true)
        handleClick()
      }
      if (error.message === "vazio") {
        setErrorMessage("Campos email e senha estão vazios!")
        setIsError(true)
        handleClick()
      }
    }
  }
  const trocaEmailSenha = async dados => {
    try {
      if (dados.email !== "") {
        await updateEmail(user, dados.email)
      }
      if (dados.senhaNova !== "") {
        await updatePassword(user, dados.senhaNova)
      }
      setIsError(false)

      handleClick()
    } catch (error) {
      console.log(error.code)
    }
  }
  const handleForm = async dados => {
    // testar ver se todos os campos estão vazios
    if (Object.values(dados).every(val => val === "")) return

    // se senha antiga for digitado
    if (dados.senhaAntiga !== "") {
      checkSenha(dados)
    }
    if (
      dados.senhaAntiga !== "" &&
      (dados.email !== "" || dados.senhaNova !== "")
    ) {
      trocaEmailSenha(dados)
    }
  }
  return (
    <>
      <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={isError ? "error" : "success"}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {isError ? `${errorMessage}` : "Informações salvas com sucesso!"}
        </Alert>
      </Snackbar>
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
            SALVAR
          </Button>
        </Box>
        <Divider />
        <Box>
          <Box m={3}>
            <Typography variant="h6" fontWeight="bold">
              Informações da empresa
            </Typography>
            <Typography variant="subtitle2">
              O nome da sua empresa é exibido em diversas áreas, incluindo na
              barra de navegação, na aba do navegador, e dentro do aplicativo.
            </Typography>

            <TextField
              sx={{ my: 2 }}
              fullWidth
              type="text"
              label="Nome da Empresa"
              name="nomeDaEmpresa"
            />
          </Box>
        </Box>
        <Divider />
        <Box m={3}>
          <Typography variant="h6" fontWeight="bold">
            Configurações de dias e horas de funcionamento
          </Typography>
          <Typography variant="subtitle2">
            Escolha as horas e os dias onde a barbearia ira funcionar.
          </Typography>

          <Autocomplete
            multiple
            id="dias"
            options={dias}
            getOptionLabel={option => option.dia}
            filterSelectedOptions
            renderInput={params => (
              <TextField sx={{ my: 2 }} {...params} label="Dias da Semana" />
            )}
          />
          <Autocomplete
            multiple
            id="horas"
            options={horas}
            getOptionLabel={option => option.hora}
            filterSelectedOptions
            renderInput={params => (
              <TextField sx={{ my: 2 }} {...params} label="Horas Abertas" />
            )}
          />
        </Box>
        <Divider />
        <Box m={3}>
          <Typography variant="h6" fontWeight="bold">
            Configurações do login gerente
          </Typography>
          <Typography variant="subtitle2">
            Para a troca de email ou senha do login gerente é preciso entrar com
            a senha antiga, para validação.
          </Typography>
          <TextField
            {...register("senhaAntiga", {
              required: false,
              minLength: {
                value: 6,
                message: "A senha deve conter no mínimo 6 dígitos",
              },
            })}
            error={!!errors.senhaAntiga}
            helperText={errors.senhaAntiga?.message}
            sx={{ my: 2 }}
            fullWidth
            required
            type="password"
            label="Senha Antiga"
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
    </>
  )
}

export default DadosEmpresa
