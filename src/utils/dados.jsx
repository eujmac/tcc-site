import { Delete, Edit } from "@mui/icons-material"
import { Box, IconButton, Tooltip } from "@mui/material"
import { useDialog } from "../context/DialogContext"
import { useDrawer } from "../context/DrawerContext"
export const diasOptions = [
  "Segunda",
  "Terça",
  "Quarta",
  "Quinta",
  "Sexta",
  "Sábado",
  "Domingo",
]
export const horasOptions = [
  "07:00",
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
  "21:00",
  "22:00",
]
export const dadosGrafico = [
  {
    id: "cortes",
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
export const colunasCliente = [
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
      const { setIsDialogOpen } = useDialog()
      const { setIsDrawerTabelaOpen } = useDrawer()

      return (
        <Box>
          <Tooltip title="Editar Cliente">
            <IconButton
              variant="contained"
              color="success"
              onClick={() => {
                setIsDrawerTabelaOpen(true)
              }}
            >
              <Edit />
            </IconButton>
          </Tooltip>
          <Tooltip title="Excluir Cliente">
            <IconButton
              variant="contained"
              color="error"
              onClick={() => {
                setIsDialogOpen(true)
              }}
            >
              <Delete />
            </IconButton>
          </Tooltip>
        </Box>
      )
    },
  },
]
export const linhasCliente = [
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
export const colunasServicos = [
  {
    field: "nome",
    headerName: "Nome",
    flex: 1,
  },
  {
    field: "preco",
    headerName: "Preço",
    flex: 1,
    valueFormatter: value => {
      if (value == null) {
        return ""
      }
      return `R$ ${value.toLocaleString()}`
    },
  },
  {
    field: "acoes",
    headerName: "Ações",
    flex: 1,
    renderCell: () => {
      const { setIsDialogOpen } = useDialog()
      const { setIsDrawerTabelaOpen } = useDrawer()

      return (
        <Box>
          <Tooltip title="Editar Serviço">
            <IconButton
              variant="contained"
              color="success"
              onClick={() => {
                setIsDrawerTabelaOpen(true)
              }}
            >
              <Edit />
            </IconButton>
          </Tooltip>
          <Tooltip title="Excluir Serviço">
            <IconButton
              variant="contained"
              color="error"
              onClick={() => {
                setIsDialogOpen(true)
              }}
            >
              <Delete />
            </IconButton>
          </Tooltip>
        </Box>
      )
    },
  },
]
export const linhasServicos = [
  {
    id: 1,
    nome: "Corte Maquina",
    preco: 30,
  },
  {
    id: 2,
    nome: "Corte Maquina + tesoura",
    preco: 40,
  },
  {
    id: 3,
    nome: "Barba",
    preco: 20,
  },
  {
    id: 4,
    nome: "Corte + Barba",
    preco: 50,
  },
]
export const colunasEquipe = [
  {
    field: "nome",
    headerName: "Nome",
    flex: 1,
  },
  {
    field: "email",
    headerName: "Email",
    flex: 1,
  },
  {
    field: "senha",
    headerName: "Senha",
    flex: 1,
  },
  {
    field: "acoes",
    headerName: "Ações",
    flex: 1,
    renderCell: () => {
      const { setIsDialogOpen } = useDialog()
      const { setIsDrawerTabelaOpen } = useDrawer()

      return (
        <Box>
          <Tooltip title="Editar Barbeiro">
            <IconButton
              variant="contained"
              color="success"
              onClick={() => {
                setIsDrawerTabelaOpen(true)
              }}
            >
              <Edit />
            </IconButton>
          </Tooltip>
          <Tooltip title="Excluir Barbeiro">
            <IconButton
              variant="contained"
              color="error"
              onClick={() => {
                setIsDialogOpen(true)
              }}
            >
              <Delete />
            </IconButton>
          </Tooltip>
        </Box>
      )
    },
  },
]
export const linhasEquipe = [
  {
    id: 1,
    nome: "João Marcos",
    email: "joao@teste.com",
    senha: "123456",
  },
  {
    id: 2,
    nome: "Pedro Henrique",
    email: "pedro@teste.com",
    senha: "pedro12345",
  },
  {
    id: 3,
    nome: "Jon Snow",
    email: "jonsnow@teste.com",
    senha: "123456789",
  },
]
