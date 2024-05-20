import Drawer from "@mui/material/Drawer"
import { Box, Button, Stack, TextField, Typography } from "@mui/material"
import { useDrawer } from "../context/DrawerContext"
import { Formik } from "formik"
import * as yup from "yup"

const celularRegex =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/

const dataNascimentoRegex =
  /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/

const checkoutSchema = yup.object().shape({
  nome: yup.string().required("Obrigatório"),
  dataNascimento: yup
    .string()
    .matches(dataNascimentoRegex, "Data de nascimento não é válida")
    .required("Obrigatório"),
  email: yup.string().email("Email inválido"),
  celular: yup
    .string()
    .matches(celularRegex, "Número de celular não é válido")
    .required("Obrigatório"),
})

const initialValues = {
  nome: "",
  dataNascimento: "",
  email: "",
  celular: "",
}
export default function DrawerAdicionar() {
  const { isDrawerAdicionarOpen, setIsDrawerAdicionarOpen } = useDrawer()
  const handleFormSubmit = () => {}
  return (
    <Drawer
      variant="temporary"
      anchor="right"
      open={isDrawerAdicionarOpen}
      onClose={() => setIsDrawerAdicionarOpen(false)}
      height={"100%"}
    >
      <Box width="50vw" role="presentation">
        <Box
          sx={{
            height: "100px",
            bgcolor: "primary.main",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
          p={4}
        >
          <Box>
            <Typography variant="h4" color="white">
              Adicionar novo cliente
            </Typography>
          </Box>
        </Box>
        <Box p={3}>
          <Formik
            onSubmit={handleFormSubmit}
            initialValues={initialValues}
            validationSchema={checkoutSchema}
          >
            {({
              values,
              errors,
              touched,
              handleBlur,
              handleChange,
              handleSubmit,
            }) => (
              <form onSubmit={handleSubmit}>
                <Stack spacing={2}>
                  <TextField
                    fullWidth
                    type="text"
                    label="Nome"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.nome}
                    name="nome"
                    error={!!touched.nome && !!errors.nome}
                    helperText={touched.nome && errors.nome}
                  />
                  <TextField
                    fullWidth
                    type="text"
                    label="Data Nascimento"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.dataNascimento}
                    name="dataNascimento"
                    error={!!touched.dataNascimento && !!errors.dataNascimento}
                    helperText={touched.dataNascimento && errors.dataNascimento}
                  />
                  <TextField
                    fullWidth
                    type="text"
                    label="Email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.email}
                    name="email"
                    error={!!touched.email && !!errors.email}
                    helperText={touched.email && errors.email}
                  />
                  <TextField
                    fullWidth
                    type="text"
                    label="Celular"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.celular}
                    name="celular"
                    error={!!touched.celular && !!errors.celular}
                    helperText={touched.celular && errors.celular}
                  />
                  <Button
                    variant="contained"
                    fullWidth
                    color="bgDark"
                    sx={{ color: "white" }}
                    onClick={() => setIsDrawerAdicionarOpen(false)}
                  >
                    Adicionar
                  </Button>
                </Stack>
              </form>
            )}
          </Formik>
        </Box>
      </Box>
    </Drawer>
  )
}
