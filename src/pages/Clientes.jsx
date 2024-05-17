import {
  Box,
  Button,
  Chip,
  Container,
  IconButton,
  InputBase,
  Paper,
  Stack,
  Typography,
} from "@mui/material"
import NavBar from "../components/NavBar"
import { DataGrid } from "@mui/x-data-grid"
import { Search } from "@mui/icons-material"

const columns = [
  {
    field: "nome",
    headerName: "Nome Completo",
    flex: 1,
  },
  { field: "email", headerName: "Email", flex: 1 },
  {
    field: "idade",
    headerName: "Idade",
    type: "number",
    headerAlign: "left",
    align: "left",
  },
  { field: "celular", headerName: "Celular", flex: 1 },
  // {
  //   field: "access",
  //   headerName: "Access Level",
  //   flex: 1,
  //   renderCell: ({ row: { access } }) => {
  //     return (
  //       <Box
  //         width="60%"
  //         m="0 auto"
  //         p="5px"
  //         display="flex"
  //         justifyContent="center"
  //         backgroundColor={
  //           access === "admin"
  //             ? colors.greenAccent[600]
  //             : colors.greenAccent[700]
  //         }
  //         borderRadius="4px"
  //       >
  //         {access === "admin" && <AdminPanelSettingsOutlined />}
  //         {access === "manager" && <SecurityOutlined />}
  //         {access === "user" && <LockOpenOutlined />}
  //         <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
  //           {access}
  //         </Typography>
  //       </Box>
  //     )
  //   },
  // },
]

const rows = [
  {
    id: 1,
    nome: "Jon Snow",
    idade: 14,
    email: "teste@gmail.com",
    celular: "(21) 99999-9999",
  },
  {
    id: 2,
    nome: "Cersei Lannister",
    idade: 31,
    email: "teste@gmail.com",
    celular: "(21) 99999-9999",
  },
  {
    id: 3,
    nome: "Jaime Lannister",
    idade: 31,
    email: "teste@gmail.com",
    celular: "(21) 99999-9999",
  },
  {
    id: 4,
    nome: "Arya Stark",
    idade: 11,
    email: "teste@gmail.com",
    celular: "(21) 99999-9999",
  },
  {
    id: 5,
    nome: "Daenerys Targaryen",
    idade: null,
    email: "teste@gmail.com",
    celular: "(21) 99999-9999",
  },
  {
    id: 6,
    nome: "Melisandre",
    idade: 150,
    email: "teste@gmail.com",
    celular: "(21) 99999-9999",
  },
  {
    id: 7,
    nome: "Ferrara Clifford",
    idade: 44,
    email: "teste@gmail.com",
    celular: "(21) 99999-9999",
  },
  {
    id: 8,
    nome: "Rossini Frances",
    idade: 36,
    email: "teste@gmail.com",
    celular: "(21) 99999-9999",
  },
  {
    id: 9,
    nome: "Harvey ",
    idade: 65,
    email: "teste@gmail.com",
    celular: "(21) 99999-9999",
  },
  {
    id: 10,
    nome: "Jon Snow",
    idade: 14,
    email: "teste@gmail.com",
    celular: "(21) 99999-9999",
  },
  {
    id: 11,
    nome: "Cersei Lannister",
    idade: 31,
    email: "teste@gmail.com",
    celular: "(21) 99999-9999",
  },
  {
    id: 12,
    nome: "Jaime Lannister",
    idade: 31,
    email: "teste@gmail.com",
    celular: "(21) 99999-9999",
  },
  {
    id: 13,
    nome: "Arya Stark",
    idade: 11,
    email: "teste@gmail.com",
    celular: "(21) 99999-9999",
  },
  {
    id: 14,
    nome: "Daenerys Targaryen",
    idade: null,
    email: "teste@gmail.com",
    celular: "(21) 99999-9999",
  },
  {
    id: 15,
    nome: "Melisandre",
    idade: 150,
    email: "teste@gmail.com",
    celular: "(21) 99999-9999",
  },
  {
    id: 16,
    nome: "Ferrara Clifford",
    idade: 44,
    email: "teste@gmail.com",
    celular: "(21) 99999-9999",
  },
  {
    id: 17,
    nome: "Rossini Frances",
    idade: 36,
    email: "teste@gmail.com",
    celular: "(21) 99999-9999",
  },
  {
    id: 18,
    nome: "Harvey ",
    idade: 65,
    email: "teste@gmail.com",
    celular: "(21) 99999-9999",
  },
]

const Clientes = () => {
  return (
    <Box>
      <NavBar />
      <Container maxWidth="xl" sx={{ mt: "2rem" }}>
        <Paper variant="outlined">
          <Stack spacing={2} p={2}>
            <Box display={"flex"} justifyContent={"space-between"}>
              <Box>
                <Typography variant="h5" fontWeight={"bold"}>
                  Lista de Clientes <Chip label="18" variant="outlined" />
                </Typography>
                <Typography variant="h6">
                  Visualizar, adicionar, editar e excluir dados dos clientes.
                </Typography>
              </Box>
              <Box alignSelf={"center"}>
                <Button variant="contained">Adicionar</Button>
              </Box>
            </Box>
            <Box sx={{ display: "flex" }}>
              <Paper variant="outlined" sx={{ display: "flex", flex: 1 }}>
                <InputBase
                  sx={{ ml: 1, flex: 1 }}
                  placeholder="Procurar pelo nome, email ou celular"
                  inputProps={{ "aria-label": "search google maps" }}
                />
                <IconButton
                  type="button"
                  sx={{ p: "10px" }}
                  aria-label="search"
                >
                  <Search />
                </IconButton>
              </Paper>
            </Box>
            <Box sx={{ height: "70vh", width: "100%" }}>
              <DataGrid
                rows={rows}
                columns={columns}
                disableRowSelectionOnClick
              />
            </Box>
          </Stack>
        </Paper>
      </Container>
    </Box>
  )
}

export default Clientes
