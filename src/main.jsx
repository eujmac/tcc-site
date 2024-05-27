import React from "react"
import ReactDOM from "react-dom/client"
import CssBaseline from "@mui/material/CssBaseline"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3"
import { RouterProvider } from "react-router-dom"
import { ptBR as ptBRDateFns } from "date-fns/locale"

import { DrawerProvider } from "./context/DrawerContext"
import DrawerCheckout from "./components/DrawerCheckout"
import DrawerAgendar from "./components/DrawerAgendar"
import { DialogProvider } from "./context/DialogContext"
import DrawerTabela from "./components/DrawerTabela"
import { router } from "./utils/rotas"
import { theme } from "./utils/theme"
import { AuthContext } from "./context/AuthContext"
import { ThemeProvider } from "@mui/material"
import { SnackbarGlobalProvider } from "./context/SnackbarGlobalContext"
import SnackbarGlobal from "./components/SnackbarGlobal"
import { BarbeariaContext } from "./context/BarbeariaContext"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <LocalizationProvider
        dateAdapter={AdapterDateFns}
        adapterLocale={ptBRDateFns}
      >
        <CssBaseline />
        <BarbeariaContext>
          <DrawerProvider>
            <DrawerCheckout />
            <DrawerAgendar />
            <DrawerTabela titulo={"Adicionar um novo cliente"} />
            <DialogProvider>
              <AuthContext>
                <SnackbarGlobalProvider>
                  <SnackbarGlobal />
                  <RouterProvider router={router} />
                </SnackbarGlobalProvider>
              </AuthContext>
            </DialogProvider>
          </DrawerProvider>
        </BarbeariaContext>
      </LocalizationProvider>
    </ThemeProvider>
  </React.StrictMode>
)
