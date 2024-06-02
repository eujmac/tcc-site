import { TextField } from "@mui/material"
import { Controller } from "react-hook-form"
import { NumericFormat } from "react-number-format"

const TextfieldPreco = ({ control, errors }) => {
  return (
    <Controller
      name="preco"
      control={control}
      defaultValue=""
      rules={{
        required: "Digite um preço",
        min: {
          value: 1,
          message: "Digite um preço",
        },
      }}
      render={({ field: { onChange, onBlur, value } }) => (
        <NumericFormat
          customInput={TextField}
          value={value}
          onValueChange={values => {
            onChange(values.value)
          }}
          onBlur={onBlur}
          label="Preço"
          margin="normal"
          allowNegative="false"
          fullWidth
          prefix="R$ "
          decimalScale={2}
          decimalSeparator="."
          error={!!errors.preco}
          helperText={errors.preco ? errors.preco.message : ""}
        />
      )}
    />
  )
}

export default TextfieldPreco
