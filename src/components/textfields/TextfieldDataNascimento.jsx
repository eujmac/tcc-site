import { TextField } from "@mui/material"
import { Controller } from "react-hook-form"
import ReactInputMask from "react-input-mask"

const TextfieldDataNascimento = ({ control, errors, required }) => {
  return (
    <Controller
      control={control}
      name="data_nascimento"
      rules={{
        required,
        pattern: {
          value: /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/,
          message: "Data de nascimento inválida",
        },
      }}
      render={({ field }) => (
        <ReactInputMask
          {...field}
          maskPlaceholder=""
          mask={"99/99/9999"}
          onChange={e => field.onChange(e.target.value)}
        >
          <TextField
            fullWidth
            label="Data de nascimento"
            margin="normal"
            error={!!errors.data_nascimento}
            helperText={
              errors.data_nascimento ? errors.data_nascimento.message : ""
            }
          />
        </ReactInputMask>
      )}
    />
  )
}

export default TextfieldDataNascimento
