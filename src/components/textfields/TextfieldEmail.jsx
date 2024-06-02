import { TextField } from "@mui/material"
import { Controller } from "react-hook-form"

const TextfieldEmail = ({ control, required, errors }) => {
  return (
    <Controller
      name="email"
      control={control}
      rules={{
        required,
        pattern: {
          value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
          message: "E-mail inválido",
        },
      }}
      render={({ field }) => (
        <TextField
          {...field}
          fullWidth
          label="E-mail"
          margin="normal"
          error={!!errors.email}
          helperText={errors.email ? errors.email.message : ""}
        />
      )}
    />
  )
}

export default TextfieldEmail
