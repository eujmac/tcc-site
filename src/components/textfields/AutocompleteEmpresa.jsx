import { CheckBox, CheckBoxOutlineBlank } from "@mui/icons-material"
import { Autocomplete, Checkbox, Chip, TextField } from "@mui/material"
import { Controller } from "react-hook-form"

const AutocompleteEmpresa = ({ name, control, options, label }) => {
  const icon = <CheckBoxOutlineBlank fontSize="small" />
  const checkedIcon = <CheckBox fontSize="small" />

  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: false }}
      render={({ field: { onChange, value } }) => (
        <Autocomplete
          multiple
          options={options}
          value={value || []}
          getOptionLabel={option => option}
          disableCloseOnSelect
          isOptionEqualToValue={(option, value) => option === value}
          renderOption={(props, option, { selected }) => {
            const { key, ...optionProps } = props
            return (
              <li key={key} {...optionProps}>
                <Checkbox
                  icon={icon}
                  checkedIcon={checkedIcon}
                  style={{ marginRight: 8 }}
                  checked={selected}
                />
                {option}
              </li>
            )
          }}
          clearText="Limpar"
          closeText="Fechar"
          openText="Abrir"
          renderTags={(tagValue, getTagProps) => {
            if (name === "horas") {
              return tagValue.sort().map((option, index) => {
                const { key, ...rest } = getTagProps({ index })
                return <Chip label={option} {...rest} key={key} />
              })
            }

            return tagValue.map((option, index) => {
              const { key, ...rest } = getTagProps({ index })
              return <Chip label={option} {...rest} key={key} />
            })
          }}
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
