import React from "react"
import ReactDOM from "react-dom/client"
import CssBaseline from "@mui/material/CssBaseline"
import { ThemeProvider } from "@emotion/react"
import { createTheme } from "@mui/material"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3"

import { BrowserRouter } from "react-router-dom"
import { App } from "./App"
import { ptBR as ptBRDateFns } from "date-fns/locale"
import { ptBR } from "@mui/x-data-grid/locales"
import { ptBR as pickersptBR } from "@mui/x-date-pickers/locales"
import { ptBR as coreBgBG } from "@mui/material/locale"
import { DrawerProvider } from "./context/DrawerContext"
import DrawerCheckout from "./components/DrawerCheckout"
import DrawerAgendar from "./components/DrawerAgendar"
import DrawerAdicionar from "./components/DrawerAdicionarCliente"
import { DialogProvider } from "./context/DialogContext"
const theme = createTheme({
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
  ptBR,
  pickersptBR,
  coreBgBG,
})

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <LocalizationProvider
          dateAdapter={AdapterDateFns}
          adapterLocale={ptBRDateFns}
        >
          <CssBaseline />
          <DrawerProvider>
            <DrawerCheckout />
            <DrawerAgendar />
            <DrawerAdicionar />
            <DialogProvider>
              <App />
            </DialogProvider>
          </DrawerProvider>
        </LocalizationProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
)
