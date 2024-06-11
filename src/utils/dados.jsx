import { Delete, Edit } from "@mui/icons-material"
import { Avatar, Box, IconButton, Tooltip } from "@mui/material"
import { useDialog } from "../context/DialogContext"
import { useDrawer } from "../context/DrawerContext"
import { useId } from "../context/IdContext"
import { differenceInYears, parse } from "date-fns"
import { SocialIcon } from "react-social-icons"

export const diasOptionsObj = [
  { dia: "Segunda", valor: 1 },
  { dia: "Terça", valor: 2 },
  { dia: "Quarta", valor: 3 },
  { dia: "Quinta", valor: 4 },
  { dia: "Sexta", valor: 5 },
  { dia: "Sábado", valor: 6 },
  { dia: "Domingo", valor: 0 },
]
export const dadosBarraMes = [
  {
    country: "AD",
    "hot dog": 35,
    "hot dogColor": "hsl(151, 70%, 50%)",
  },
  {
    country: "AE",
    "hot dog": 45,
    "hot dogColor": "hsl(254, 70%, 50%)",
  },
  {
    country: "AF",
    "hot dog": 159,
    "hot dogColor": "hsl(166, 70%, 50%)",
  },
  {
    country: "AG",
    "hot dog": 62,
    "hot dogColor": "hsl(138, 70%, 50%)",
  },
  {
    country: "AI",
    "hot dog": 169,
    "hot dogColor": "hsl(6, 70%, 50%)",
  },
  {
    country: "AL",
    "hot dog": 188,
    "hot dogColor": "hsl(27, 70%, 50%)",
  },
  {
    country: "AM",
    "hot dog": 68,
    "hot dogColor": "hsl(168, 70%, 50%)",
  },
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
      const { setId, setIdTabela } = useId()
      const { setIsDialogExcluirClienteOpen } = useDialog()
      const { setIsDrawerEditarClienteOpen } = useDrawer()
      return (
        <>
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
                setIdTabela("clientes")
                setId(params.id)
                setIsDialogExcluirClienteOpen(true)
              }}
            >
              <Delete />
            </IconButton>
          </Tooltip>
          <Tooltip title="Entrar em contato">
            <IconButton
              variant="contained"
              color="success"
              onClick={() => {
                const celularLimpo = params.row.telefone.replace(/[()\s-]/g, "")
                const celularInternacional = `+55${celularLimpo}`
                window.open(`https://wa.me/${celularInternacional}/`, "_blank")
              }}
            >
              <SocialIcon
                network="whatsapp"
                style={{ height: 24, width: 24 }}
              />
            </IconButton>
          </Tooltip>
        </>
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
      const { setId, setIdTabela } = useId()
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
                setIdTabela("servicos")
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
      const { setId, setIdTabela } = useId()
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
                setIdTabela("equipe")
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
