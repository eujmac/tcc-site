import Button from "@mui/material/Button"
import Popover from "@mui/material/Popover"
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state"
import { DateCalendar } from "@mui/x-date-pickers"
import { useBarbearia } from "../../context/BarbeariaContext"
import { diasOptionsObj } from "../../utils/dados"

export default function CalendarioPopover({ dataAtual, setDataAtual, data }) {
  const { diasRealTime } = useBarbearia()

  const shouldDisableDate = date => {
    const day = date.getDay()
    const allowedDays = diasRealTime.map(dayString => {
      const dayObject = diasOptionsObj.find(dayObj => dayObj.dia === dayString)
      return dayObject ? dayObject.valor : null
    })
    return !allowedDays.includes(day)
  }
  return (
    <PopupState variant="popover" popupId="demo-popup-popover">
      {popupState => (
        <div>
          <Button
            variant="contained"
            {...bindTrigger(popupState)}
            sx={{ px: 5.5 }}
          >
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
              onChange={novaData => {
                setDataAtual(novaData)
                popupState.close()
              }}
              shouldDisableDate={shouldDisableDate}
            ></DateCalendar>
          </Popover>
        </div>
      )}
    </PopupState>
  )
}
