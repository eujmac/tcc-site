import { Autocomplete, TextField } from "@mui/material"
import { Controller } from "react-hook-form"

const tipos = ["Barbearia", "Venda"]

const TextfieldTipo = ({ control, errors }) => {
  return (
    <Controller
      name="tipo"
      control={control}
      rules={{ required: "Selecione um tipo" }}
      render={({ field: { onChange, value } }) => (
        <Autocomplete
          options={tipos}
          value={value}
          clearText="Limpar"
          closeText="Fechar"
          openText="Abrir"
          onChange={(event, newValue) => onChange(newValue)}
          isOptionEqualToValue={(option, value) => option === value}
          renderInput={params => (
            <TextField
              margin="normal"
              {...params}
              label="Tipo do serviço"
              error={!!errors.tipo}
              helperText={errors.tipo ? errors.tipo.message : ""}
            />
          )}
        />
      )}
    />
  )
}

export default TextfieldTipo
