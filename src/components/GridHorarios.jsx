import { Button, Grid } from "@mui/material"
import React from "react"

const GridHorarios = () => {
  return (
    <Grid container rowGap={1}>
      <Grid item xs={2}>
        <Button variant="outlined" disabled>
          06:00
        </Button>
      </Grid>
      <Grid item xs={2}>
        <Button variant="outlined" disabled>
          07:00
        </Button>
      </Grid>
      <Grid item xs={2}>
        <Button variant="outlined" disabled>
          08:00
        </Button>
      </Grid>
      <Grid item xs={2}>
        <Button variant="outlined">09:00</Button>
      </Grid>
      <Grid item xs={2}>
        <Button variant="outlined">10:00</Button>
      </Grid>
      <Grid item xs={2}>
        <Button variant="outlined" disabled>
          11:00
        </Button>
      </Grid>
      <Grid item xs={2}>
        <Button variant="outlined">12:00</Button>
      </Grid>
      <Grid item xs={2}>
        <Button variant="outlined">13:00</Button>
      </Grid>
      <Grid item xs={2}>
        <Button variant="outlined" disabled>
          14:00
        </Button>
      </Grid>
      <Grid item xs={2}>
        <Button variant="outlined">15:00</Button>
      </Grid>
      <Grid item xs={2}>
        <Button variant="outlined" disabled>
          16:00
        </Button>
      </Grid>
      <Grid item xs={2}>
        <Button variant="outlined">17:00</Button>
      </Grid>
      <Grid item xs={2}>
        <Button variant="outlined">18:00</Button>
      </Grid>
      <Grid item xs={2}>
        <Button variant="outlined">19:00</Button>
      </Grid>
      <Grid item xs={2}>
        <Button variant="outlined">20:00</Button>
      </Grid>
      <Grid item xs={2}>
        <Button variant="outlined" disabled>
          21:00
        </Button>
      </Grid>
      <Grid item xs={2}>
        <Button variant="outlined" disabled>
          22:00
        </Button>
      </Grid>
    </Grid>
  )
}

export default GridHorarios
