import Avatar from "@mui/material/Avatar"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"
import LockOpenIcon from "@mui/icons-material/LockOpen"
import Typography from "@mui/material/Typography"
import { Paper } from "@mui/material"
import { useNavigate } from "react-router-dom"

export default function Login() {
  const navigate = useNavigate()
  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <Grid
        item
        xs={false}
        md={7}
        sx={{
          backgroundImage: "url(./login-bg2.jpg)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Grid item xs={12} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            mt: 30,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "primary.main", width: 40, height: 40 }}>
            <LockOpenIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <Box component="form" noValidate onSubmit={() => {}} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Senha"
              type="password"
              autoComplete="password"
            />
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={() => navigate("/home")}
            >
              Entrar
            </Button>
          </Box>
        </Box>
      </Grid>
    </Grid>
  )
}
