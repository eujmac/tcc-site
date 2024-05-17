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
import { DrawerProvider } from "./context/DrawerContext"
import DrawerCheckout from "./components/DrawerCheckout"
import DrawerAgendar from "./components/DrawerAgendar"
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
            <App />
          </DrawerProvider>
        </LocalizationProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
)
