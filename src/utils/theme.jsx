import { ptBR } from "@mui/material/locale"
import { createTheme } from "@mui/material"
import { ptBR as dataGridptBr } from "@mui/x-data-grid/locales"
export const theme = createTheme({
  palette: {
    primary: {
      main: "rgba(199,99,62,255)",
    },
    bgDark: {
      main: "#0d1619",
    },
    cinza: {
      main: "#a9a9a9",
    },
  },
  dataGridptBr,
  ptBR,
})
