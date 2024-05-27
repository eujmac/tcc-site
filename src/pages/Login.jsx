import Avatar from "@mui/material/Avatar"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"
import LockOpenIcon from "@mui/icons-material/LockOpen"
import Typography from "@mui/material/Typography"
import { Alert, CircularProgress, Paper } from "@mui/material"
import { Navigate, useNavigate } from "react-router-dom"
import { useState } from "react"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../services/firebase"
import { useAuth } from "../context/AuthContext"
import { useForm } from "react-hook-form"
import { useSnackbarGlobal } from "../context/SnackbarGlobalContext"

export default function Login() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const { handleClick, dispatch } = useSnackbarGlobal()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const login = async data => {
    try {
      setIsLoading(true)
      await signInWithEmailAndPassword(auth, data.email, data.senha)

      // setar o tipo do user aki

      setIsLoading(false)
      navigate("/home")
    } catch (error) {
      setIsLoading(false)
      dispatch("login.error")
      handleClick()
    }
  }
  return (
    <>
      {user ? (
        <Navigate to="/home" />
      ) : (
        <Grid container component="main" sx={{ height: "100vh" }}>
          <GridItemImagem />
          <Grid item xs={12} md={5} component={Paper} elevation={6} square>
            <Box
              sx={{
                mx: 4,
                display: "grid",
                placeContent: "center",
                height: "100vh",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Avatar
                  sx={{ m: 1, bgcolor: "primary.main", width: 40, height: 40 }}
                >
                  <LockOpenIcon />
                </Avatar>
                <Typography variant="h5">Login</Typography>
                <Box
                  component="form"
                  sx={{ mt: 1 }}
                  onSubmit={handleSubmit(login)}
                  noValidate
                >
                  <TextField
                    {...register("email", {
                      required: "Digite um e-mail",
                      pattern: {
                        value:
                          /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                        message: "E-mail inválido",
                      },
                    })}
                    error={!!errors.email}
                    helperText={errors.email?.message}
                    margin="normal"
                    fullWidth
                    id="email"
                    label="Email"
                    autoComplete="email"
                    autoFocus
                  />
                  <TextField
                    {...register("senha", {
                      required: "Digite uma senha",
                      minLength: {
                        value: 6,
                        message: "A senha deve conter no mínimo 6 dígitos",
                      },
                    })}
                    error={!!errors.senha}
                    helperText={errors.senha?.message}
                    margin="normal"
                    fullWidth
                    label="Senha"
                    type="password"
                    autoComplete="password"
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    {isLoading ? (
                      <CircularProgress
                        color="inherit"
                        size={24.5}
                        sx={{ width: "40px" }}
                      />
                    ) : (
                      "Entrar"
                    )}
                  </Button>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      )}
    </>
  )
}
const GridItemImagem = () => {
  return (
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
  )
}
