import Drawer from "@mui/material/Drawer"
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  Tooltip,
  Typography,
  styled,
} from "@mui/material"
import { useDrawer } from "../../context/DrawerContext"
import { useForm } from "react-hook-form"
import { useState } from "react"
import { db, storage } from "../../services/firebase"
import { push, ref, set } from "firebase/database"
import { useSnackbarGlobal } from "../../context/SnackbarGlobalContext"
import {
  ref as refStorage,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage"
import TextfieldNome from "../textfields/TextfieldNome"
import TextfieldEmail from "../textfields/TextfieldEmail"
import TextfieldCelular from "../textfields/TextfieldCelular"
import { useEquipe } from "../../context/EquipeContext"
import { Close, CloudUpload } from "@mui/icons-material"
const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
})
export default function DrawerAdicionarEquipe() {
  const { isDrawerAdicionarEquipeOpen, setIsDrawerAdicionarEquipeOpen } =
    useDrawer()
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const { equipeRealTime } = useEquipe()
  const {
    control,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      nome: "",
      email: "",
      celular: "",
    },
  })

  const { mostraSnackbar } = useSnackbarGlobal()

  const handleFileChange = e => {
    const file = e.target.files[0]
    if (file) {
      setImageFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
      }
      reader.readAsDataURL(file)
    } else {
      setImageFile(null)
      setImagePreview(null)
    }
  }
  const adicionar = async dados => {
    const objetoEncontrado = equipeRealTime.find(
      obj =>
        obj.nome === dados.nome ||
        obj.email === dados.email ||
        obj.celular === dados.celular
    )
    if (objetoEncontrado) {
      if (objetoEncontrado.nome === dados.nome) {
        setError("nome", {
          type: "manual",
          message: "Nome já cadastrado",
        })
      }
      if (objetoEncontrado.email === dados.email) {
        setError("email", {
          type: "manual",
          message: "E-mail já cadastrado",
        })
      }
      if (objetoEncontrado.celular === dados.celular) {
        setError("celular", {
          type: "manual",
          message: "Celular já cadastrado",
        })
      }
    } else {
      try {
        const equipeListRef = ref(db, "equipe")
        const newEquipeRef = push(equipeListRef)
        if (imageFile) {
          setIsLoading(true)
          const imageRef = refStorage(
            storage,
            `${dados.nome}-${imageFile.name}`
          )
          const uploadTask = uploadBytesResumable(imageRef, imageFile)

          uploadTask.on(
            "state_changed",
            snapshot => {
              // Calcula a porcentagem do progresso
            },
            error => {
              // Trate os erros de upload
              console.error("Erro ao subir a imagem: ", error)
            },
            async () => {
              // Upload completo, obtenha a URL de download
              const downloadURL = await getDownloadURL(uploadTask.snapshot.ref)
              // verificar se o barbeiro já existe
              set(newEquipeRef, {
                nome: dados.nome,
                email: dados.email,
                celular: dados.celular,
                foto: downloadURL,
              })
              setIsLoading(false)
              setIsDrawerAdicionarEquipeOpen(false)
              reset()
              setImagePreview(null)
              setImageFile(null)
              mostraSnackbar("sucessoAdicionar")
            }
          )
        } else {
          // verificar se o barbeiro já existe

          set(newEquipeRef, {
            nome: dados.nome,
            email: dados.email,
            celular: dados.celular,
          })
          setIsDrawerAdicionarEquipeOpen(false)
          reset()
          setImagePreview(null)
          setImageFile(null)
          mostraSnackbar("sucessoAdicionar")
        }
      } catch (error) {
        console.log(error)
      }
    }
  }
  const deletarFoto = () => {
    setImageFile(null)
    setImagePreview(null)
  }
  return (
    <Drawer
      variant="temporary"
      anchor="right"
      open={isDrawerAdicionarEquipeOpen}
      onClose={() => {
        setIsDrawerAdicionarEquipeOpen(false)
        reset()
        setImagePreview(null)
        setImageFile(null)
      }}
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
              Adicionar um novo membro da equipe.
            </Typography>
          </Box>
        </Box>
        <Box
          p={3}
          component="form"
          onSubmit={handleSubmit(adicionar)}
          noValidate
        >
          <Typography variant="h5">Informações Básicas</Typography>
          <Typography variant="subtitle2">
            Adicione o nome, e-mail, celular e escolha a foto do barbeiro.
          </Typography>
          <TextfieldNome
            control={control}
            errors={errors}
            required="Digite o nome do barbeiro"
          />
          <TextfieldEmail
            control={control}
            errors={errors}
            required="Digite o e-mail do barbeiro"
          />
          <TextfieldCelular
            control={control}
            errors={errors}
            required="Digite o celular do barbeiro"
          />

          <Box display="flex" py={1}>
            <Box>
              <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUpload />}
              >
                Carregar Foto
                <VisuallyHiddenInput
                  accept="image/png, image/gif, image/jpeg"
                  type="file"
                  onChange={handleFileChange}
                />
              </Button>
            </Box>
            {imagePreview && (
              <Box
                ml={3}
                sx={{
                  position: "relative",
                }}
              >
                <Tooltip title="Excluir foto">
                  <IconButton
                    aria-label="delete"
                    sx={{ position: "absolute", top: 2, right: 2 }}
                    onClick={deletarFoto}
                  >
                    <Close color="error" />
                  </IconButton>
                </Tooltip>
                <div>
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      style={{ width: "200px", height: "auto" }}
                    />
                  ) : (
                    <Typography>Sem foto</Typography>
                  )}
                </div>
              </Box>
            )}
          </Box>
          <Button
            variant="contained"
            type="submit"
            fullWidth
            color="bgDark"
            sx={{ color: "white", mt: 2 }}
          >
            {isLoading ? (
              <CircularProgress
                color="inherit"
                size={24.5}
                sx={{ width: "40px" }}
              />
            ) : (
              "Adicionar"
            )}
          </Button>
        </Box>
      </Box>
    </Drawer>
  )
}
