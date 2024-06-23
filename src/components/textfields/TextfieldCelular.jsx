import { TextField } from "@mui/material"
import { Controller } from "react-hook-form"
import ReactInputMask from "react-input-mask"

const TextfieldCelular = ({ control, errors, required }) => {
  return (
    <Controller
      control={control}
      name="celular"
      rules={{
        required,
        pattern: {
          value:
            /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/,
          message: "Celular inválido",
        },
      }}
      render={({ field }) => (
        <ReactInputMask
          {...field}
          maskPlaceholder=""
          mask={"(99) \\99999-9999"}
          onChange={e => field.onChange(e.target.value)}
        >
          <TextField
            fullWidth
            inputRef={field.ref}
            label="Celular"
            margin="normal"
            error={!!errors.celular}
            helperText={errors.celular ? errors.celular.message : ""}
          />
        </ReactInputMask>
      )}
    />
  )
}

export default TextfieldCelular
