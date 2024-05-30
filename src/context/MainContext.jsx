import { CssBaseline, ThemeProvider } from "@mui/material"
import { theme } from "../utils/theme"
import { LocalizationProvider } from "@mui/x-date-pickers"
import { ptBR as ptBRDateFns } from "date-fns/locale"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3"
import { BarbeariaContext } from "./BarbeariaContext"
import { ServicosContext } from "./ServicosContext"
import { SnackbarGlobalProvider } from "./SnackbarGlobalContext"
import { IdContext } from "./IdContext"
import { DrawerProvider } from "./DrawerContext"
import { DialogProvider } from "./DialogContext"
import { AuthContext } from "./AuthContext"

const MainContext = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider
        dateAdapter={AdapterDateFns}
        adapterLocale={ptBRDateFns}
      >
        <BarbeariaContext>
          <ServicosContext>
            <SnackbarGlobalProvider>
              <IdContext>
                <DrawerProvider>
                  <DialogProvider>
                    <AuthContext>
                      <CssBaseline />
                      {children}
                    </AuthContext>
                  </DialogProvider>
                </DrawerProvider>
              </IdContext>
            </SnackbarGlobalProvider>
          </ServicosContext>
        </BarbeariaContext>
      </LocalizationProvider>
    </ThemeProvider>
  )
}

export default MainContext
