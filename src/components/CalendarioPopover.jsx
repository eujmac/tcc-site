import Button from "@mui/material/Button"
import Popover from "@mui/material/Popover"
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state"
import { DateCalendar } from "@mui/x-date-pickers"

export default function CalendarioPopover({ dataAtual, setDataAtual, data }) {
  return (
    <PopupState variant="popover" popupId="demo-popup-popover">
      {popupState => (
        <div>
          <Button variant="contained" {...bindTrigger(popupState)}>
            {data}
          </Button>
          <Popover
            {...bindPopover(popupState)}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
          >
            <DateCalendar
              value={dataAtual}
              onChange={novaData => setDataAtual(novaData)}
              sx={{ zIndex: 10 }}
            ></DateCalendar>
          </Popover>
        </div>
      )}
    </PopupState>
  )
}
