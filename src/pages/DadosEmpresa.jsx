import {
  Autocomplete,
  Box,
  Button,
  Divider,
  TextField,
  Typography,
} from "@mui/material"

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
  return (
    <>
      <Box
        sx={{
          height: "136px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mx: 3,
        }}
      >
        <Typography variant="h4">Dados da Empresa</Typography>
        <Button variant="contained">SALVAR</Button>
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
        <TextField
          sx={{ my: 2 }}
          fullWidth
          required
          type="password"
          label="Senha Antiga"
          name="nomeDaEmpresa"
        />
        <TextField
          sx={{ my: 2 }}
          fullWidth
          type="text"
          label="Novo Email"
          name="nomeDaEmpresa"
        />
        <TextField
          sx={{ my: 2 }}
          fullWidth
          type="password"
          label="Nova Senha"
          name="nomeDaEmpresa"
        />
      </Box>
    </>
  )
}

export default DadosEmpresa
