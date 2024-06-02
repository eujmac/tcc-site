import { Delete, Edit } from "@mui/icons-material"
import { Avatar, Box, IconButton, Tooltip } from "@mui/material"
import { useDialog } from "../context/DialogContext"
import { useDrawer } from "../context/DrawerContext"
import { useId } from "../context/IdContext"
import { differenceInYears, parse } from "date-fns"

export const diasOptionsObj = [
  { dia: "Segunda", valor: 1 },
  { dia: "Terça", valor: 2 },
  { dia: "Quarta", valor: 3 },
  { dia: "Quinta", valor: 4 },
  { dia: "Sexta", valor: 5 },
  { dia: "Sábado", valor: 6 },
  { dia: "Domingo", valor: 0 },
]
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
    field: "data_nascimento",
    headerName: "Idade",
    type: "number",
    headerAlign: "left",
    align: "left",
    flex: 1,
    valueGetter: value => {
      const nascimento = parse(value, "dd/MM/yyyy", new Date())
      const hoje = new Date()
      return differenceInYears(hoje, nascimento)
    },
  },
  { field: "telefone", headerName: "Celular", flex: 1 },
  {
    field: "access",
    headerName: "Ações",
    flex: 1,
    renderCell: params => {
      const { setId } = useId()
      const { setIsDialogExcluirClienteOpen } = useDialog()
      const { setIsDrawerEditarClienteOpen } = useDrawer()

      return (
        <Box>
          <Tooltip title="Editar Cliente">
            <IconButton
              variant="contained"
              color="success"
              onClick={() => {
                setId(params.id)
                setIsDrawerEditarClienteOpen(true)
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
                setId(params.id)
                setIsDialogExcluirClienteOpen(true)
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
export const colunasServicos = [
  {
    field: "nome",
    headerName: "Nome",
    flex: 1,
  },
  {
    field: "tipo",
    headerName: "Tipo",
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
    renderCell: params => {
      const { setId } = useId()
      const { setIsDialogServicoOpen } = useDialog()
      const { setIsDrawerEditarServicoOpen } = useDrawer()
      return (
        <Box>
          <Tooltip title="Editar Serviço">
            <IconButton
              variant="contained"
              color="success"
              onClick={() => {
                setId(params.id)
                setIsDrawerEditarServicoOpen(true)
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
                setId(params.id)
                setIsDialogServicoOpen(true)
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
export const colunasEquipe = [
  {
    field: "foto",
    headerName: "Foto",
    renderCell: params => (
      <Avatar alt="Foto" src={params.value} sx={{ mt: 0.6 }} />
    ),
  },
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
    field: "celular",
    headerName: "Celular",
    flex: 1,
  },
  {
    field: "acoes",
    headerName: "Ações",
    flex: 1,
    renderCell: params => {
      const { setId } = useId()
      const { setIsDialogExcluirEquipeOpen } = useDialog()
      const { setIsDrawerEditarEquipeOpen } = useDrawer()

      return (
        <Box>
          <Tooltip title="Editar Barbeiro">
            <IconButton
              variant="contained"
              color="success"
              onClick={() => {
                setId(params.id)
                setIsDrawerEditarEquipeOpen(true)
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
                setId(params.id)
                setIsDialogExcluirEquipeOpen(true)
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
