import { Autocomplete, Chip, TextField } from "@mui/material"
import { Controller } from "react-hook-form"

const AutocompleteEmpresa = ({ name, control, options, label }) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: false }}
      render={({ field: { onChange, value } }) => (
        <Autocomplete
          multiple
          filterSelectedOptions
          options={options}
          value={value || []}
          getOptionLabel={option => option}
          isOptionEqualToValue={(option, value) => option === value}
          clearText="Limpar"
          closeText="Fechar"
          openText="Abrir"
          renderTags={(tagValue, getTagProps) =>
            tagValue.map((option, index) => {
              const { key, ...rest } = getTagProps({ index })
              return <Chip label={option} {...rest} key={key} />
            })
          }
          onChange={(event, newValue) => {
            onChange(newValue)
          }}
          renderInput={params => (
            <TextField {...params} label={label} margin="normal" />
          )}
        />
      )}
    />
  )
}

export default AutocompleteEmpresa
