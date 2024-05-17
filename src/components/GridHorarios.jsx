import { Box, Button, Chip, CircularProgress, Grid } from "@mui/material"
import { useDrawer } from "../context/DrawerContext"
const GridHora = ({ hora, status }) => {
  const { setIsDrawerCheckoutOpen, setIsDrawerAgendarOpen } = useDrawer()

  return (
    <Grid item xs={3} sm={2}>
      {status === "negado" && (
        <Button variant="outlined" disabled>
          {hora}
        </Button>
      )}
      {status === "livre" && (
        <Button
          variant="outlined"
          color="success"
          onClick={() => setIsDrawerAgendarOpen(true)}
        >
          {hora}
        </Button>
      )}
      {status === "agendado" && (
        <Button
          variant="outlined"
          color="error"
          onClick={() => setIsDrawerCheckoutOpen(true)}
        >
          {hora}
        </Button>
      )}
    </Grid>
  )
}
const GridHorarios = ({ isLoading }) => {
  return (
    <>
      {isLoading ? (
        <CircularProgress color="primary" sx={{ alignSelf: "center" }} />
      ) : (
        <>
          {" "}
          <Grid container rowGap={1}>
            <GridHora hora="07:00" status="livre" />
            <GridHora hora="08:00" status="agendado" />
            <GridHora hora="09:00" status="negado" />
            <GridHora hora="10:00" status="livre" />
            <GridHora hora="11:00" status="agendado" />
            <GridHora hora="12:00" status="negado" />
            <GridHora hora="13:00" status="livre" />
            <GridHora hora="14:00" status="agendado" />
            <GridHora hora="15:00" status="negado" />
            <GridHora hora="16:00" status="livre" />
            <GridHora hora="17:00" status="agendado" />
            <GridHora hora="18:00" status="negado" />
            <GridHora hora="19:00" status="livre" />
            <GridHora hora="20:00" status="agendado" />
            <GridHora hora="21:00" status="negado" />
            <GridHora hora="22:00" status="livre" />
          </Grid>
          <Box display="flex" gap={2}>
            <Chip label="Indisponível" size="small" sx={{ fontSize: 12 }} />
            <Chip
              label="Livre"
              size="small"
              color="success"
              sx={{ fontSize: 12 }}
            />
            <Chip
              label="Agendado"
              size="small"
              color="error"
              sx={{ fontSize: 12 }}
            />
          </Box>
        </>
      )}
    </>
  )
}

export default GridHorarios
