import { TextField } from "@mui/material"
import { Controller } from "react-hook-form"

const TextfieldNome = ({ control, errors, required }) => {
  return (
    <Controller
      name="nome"
      control={control}
      rules={{ required }}
      render={({ field }) => (
        <TextField
          {...field}
          fullWidth
          inputRef={field.ref}
          label="Nome"
          margin="normal"
          error={!!errors.nome}
          helperText={errors.nome ? errors.nome.message : ""}
        />
      )}
    />
  )
}

export default TextfieldNome
