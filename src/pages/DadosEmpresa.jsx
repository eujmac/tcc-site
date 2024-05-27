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
import { useForm } from "react-hook-form"
import { useAuth } from "../context/AuthContext"
import { useEffect, useState } from "react"
import { useSnackbarGlobal } from "../context/SnackbarGlobalContext"
import { useBarbearia } from "../context/BarbeariaContext"
import { ref, update } from "firebase/database"
import { db } from "../services/firebase"
import { diasOptions, horasOptions } from "../utils/dados"

const DadosEmpresa = () => {
  const { user } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [novosDias, setNovosDias] = useState([])
  const [novasHoras, setNovasHoras] = useState([])
  const { handleClick, dispatch } = useSnackbarGlobal()
  const { nomeBarbeariaRealTime, diasRealTime, horasRealTime } = useBarbearia()
  const {
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({})

  useEffect(() => {
    setValue("nome", nomeBarbeariaRealTime)
    setNovosDias(diasRealTime)
    setNovasHoras(horasRealTime)
  }, [])

  const mostraSnackbar = tipoDispatch => {
    setIsLoading(false)
    dispatch(tipoDispatch)
    handleClick()
  }

  const salvar = async dados => {
    update(ref(db, "barbearia/-NyuqtGr_WyCGrmZk_oz"), {
      nome: dados.nome,
      diasFuncionamento: novosDias,
      horasFuncionamento: novasHoras,
    })
    mostraSnackbar("sucesso")
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
    }
    salvar(dados)
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
          <TextField
            {...register("nome", {
              required: false,
            })}
            placeholder={nomeBarbeariaRealTime}
            sx={{ my: 2 }}
            fullWidth
            type="text"
            label="Nome da Empresa"
          />
        </Box>
      </Box>
      <Divider />
      <Box m={3}>
        <TituloSubtitulo
          titulo="Configurações de dias e horas de funcionamento"
          subtitulo="Escolha as horas e os dias onde a barbearia ira funcionar."
        />
        {/*
          1 - do contexto vai vir os dias que estão no banco
          2 - com esse dias eu deve por no autocomplete ao carregar
          3 - onchange eu deve alterar um state local com os novos dias
          4 - ao salvar eu altero no banco

        */}
        <Autocomplete
          sx={{ my: 2 }}
          multiple
          value={novosDias}
          filterSelectedOptions
          onChange={(event, newValue) => {
            setNovosDias(newValue)
          }}
          options={diasOptions}
          getOptionLabel={option => option}
          isOptionEqualToValue={(option, value) => option === value}
          renderInput={params => (
            <TextField {...params} label="Dias da semana" />
          )}
          renderTags={(tagValue, getTagProps) =>
            tagValue.map((option, index) => {
              const { key, ...rest } = getTagProps({ index })
              return <Chip label={option} {...rest} key={key} />
            })
          }
        />
        <Autocomplete
          sx={{ my: 2 }}
          multiple
          value={novasHoras}
          filterSelectedOptions
          onChange={(event, newValue) => {
            setNovasHoras(newValue)
          }}
          options={horasOptions}
          getOptionLabel={option => option}
          isOptionEqualToValue={(option, value) => option === value}
          renderInput={params => <TextField {...params} label="Horas" />}
          renderTags={(tagValue, getTagProps) =>
            tagValue.map((option, index) => {
              const { key, ...rest } = getTagProps({ index })
              return <Chip label={option} {...rest} key={key} />
            })
          }
        />
      </Box>
      <Divider />
      <Box m={3}>
        <TituloSubtitulo
          titulo="Configurações do login gerente"
          subtitulo="Para a troca de email ou senha do login gerente é preciso entrar com a
          senha Atual, para validação."
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
