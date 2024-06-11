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
import { EquipeContext } from "./EquipeContext"
import { ClienteContext } from "./ClienteContext"
import { AgendaLocalContext } from "./AgendaLocalContext"
import { AgendaRealTimeContext } from "./AgendaRealTimeContext"

const MainContext = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider
        dateAdapter={AdapterDateFns}
        adapterLocale={ptBRDateFns}
      >
        <BarbeariaContext>
          <AgendaRealTimeContext>
            <AgendaLocalContext>
              <ClienteContext>
                <ServicosContext>
                  <EquipeContext>
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
                  </EquipeContext>
                </ServicosContext>
              </ClienteContext>
            </AgendaLocalContext>
          </AgendaRealTimeContext>
        </BarbeariaContext>
      </LocalizationProvider>
    </ThemeProvider>
  )
}

export default MainContext
