import { TextField } from "@mui/material"
import { Controller } from "react-hook-form"

const TextfieldSenhaLogin = ({ control, errors }) => {
  return (
    <Controller
      name="senha"
      control={control}
      rules={{
        required: "Digite uma senha",
        minLength: {
          value: 6,
          message: "A senha deve conter no mínimo 6 dígitos",
        },
      }}
      render={({ field }) => (
        <TextField
          {...field}
          fullWidth
          type="password"
          label="Senha"
          margin="normal"
          error={!!errors.senha}
          helperText={errors.senha ? errors.senha.message : ""}
        />
      )}
    />
  )
}

export default TextfieldSenhaLogin
