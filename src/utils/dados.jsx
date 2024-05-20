import { Delete, Edit } from "@mui/icons-material"
import { Box, IconButton, Tooltip } from "@mui/material"

export const dados = [
  {
    id: "japan",
    color: "hsl(106, 70%, 50%)",
    data: [
      {
        x: "01/05",
        y: 5,
      },
      {
        x: "02/05",
        y: 6,
      },
      {
        x: "03/05",
        y: 2,
      },
      {
        x: "04/05",
        y: 4,
      },
      {
        x: "05/05",
        y: 7,
      },
      {
        x: "06/05",
        y: 6,
      },
      {
        x: "07/05",
        y: 5,
      },
    ],
  },
]

export const columns = [
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
    flex: 1,
  },
  { field: "celular", headerName: "Celular", flex: 1 },
  {
    field: "access",
    headerName: "Ações",
    flex: 1,
    renderCell: () => {
      return (
        <Box>
          <Tooltip title="Editar Cliente">
            <IconButton variant="contained" color="success" onClick={() => {}}>
              <Edit />
            </IconButton>
          </Tooltip>
          <Tooltip title="Excluir Cliente">
            <IconButton variant="contained" color="error" onClick={() => {}}>
              <Delete />
            </IconButton>
          </Tooltip>
        </Box>
      )
    },
  },
]

export const rows = [
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
