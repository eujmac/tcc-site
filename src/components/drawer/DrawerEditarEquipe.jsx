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
import { useEffect, useState } from "react"
import { db, storage } from "../../services/firebase"
import { get, ref, update } from "firebase/database"
import { useSnackbarGlobal } from "../../context/SnackbarGlobalContext"
import { useId } from "../../context/IdContext"
import {
  getDownloadURL,
  ref as refStorage,
  uploadBytesResumable,
} from "firebase/storage"
import TextfieldNome from "./../textfields/TextfieldNome"
import TextfieldEmail from "../textfields/TextfieldEmail"
import TextfieldCelular from "../textfields/TextfieldCelular"
import { Close, CloudUpload } from "@mui/icons-material"
import { useEquipe } from "../../context/EquipeContext"
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
export default function DrawerEditarEquipe() {
  const { isDrawerEditarEquipeOpen, setIsDrawerEditarEquipeOpen } = useDrawer()
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const { equipeRealTime } = useEquipe()
  const {
    control,
    setValue,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      nome: "",
      data_nascimento: "",
      email: "",
      celular: "",
    },
  })

  const { mostraSnackbar } = useSnackbarGlobal()
  const { id, setId } = useId()

  useEffect(() => {
    const getEquipe = async id => {
      const dbRef = ref(db, `equipe/${id}`)
      const snapshot = await get(dbRef)
      if (snapshot.exists()) {
        // popula os campos
        const obj = snapshot.val()
        setValue("nome", obj.nome)
        setValue("email", obj.email)
        setValue("celular", obj.celular)
        setImageFile(null)
        setImagePreview(null)
        if (obj.foto) setImagePreview(obj.foto)
      }
    }
    getEquipe(id)
  }, [equipeRealTime, id, setValue])

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

  const editar = dados => {
    try {
      const equipeRef = ref(db, `equipe/${id}`)
      if (imageFile) {
        setIsLoading(true)
        const imageRef = refStorage(storage, `${dados.nome}-${imageFile.name}`)
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
            update(equipeRef, {
              nome: dados.nome,
              email: dados.email,
              celular: dados.celular,
              foto: downloadURL,
            })
            setIsLoading(false)
            setIsDrawerEditarEquipeOpen(false)
            reset()
            setImagePreview(null)
            mostraSnackbar("sucessoAdicionar")
          }
        )
      } else if (!imageFile && !imagePreview) {
        const equipeRef = ref(db, `equipe/${id}`)
        update(equipeRef, {
          nome: dados.nome,
          email: dados.email,
          celular: dados.celular,
          foto: null,
        })
        setIsDrawerEditarEquipeOpen(false)
        setImagePreview(null)
        setImageFile(null)
        reset()
        mostraSnackbar("sucessoEditar")
      } else {
        const equipeRef = ref(db, `equipe/${id}`)
        update(equipeRef, {
          nome: dados.nome,
          email: dados.email,
          celular: dados.celular,
        })
        setIsDrawerEditarEquipeOpen(false)
        setImagePreview(null)
        setImageFile(null)
        reset()
        mostraSnackbar("sucessoEditar")
      }
    } catch (error) {
      console.log(error)
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
      open={isDrawerEditarEquipeOpen}
      onClose={() => {
        setIsDrawerEditarEquipeOpen(false)
        setImagePreview(null)
        setImageFile(null)
        setId(null)
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
              Editar membro da equipe.
            </Typography>
          </Box>
        </Box>
        <Box p={3} component="form" onSubmit={handleSubmit(editar)} noValidate>
          <Typography variant="h5">Informações Básicas</Typography>
          <Typography variant="subtitle2">
            Edite o nome, e-mail, celular e foto do barbeiro.
          </Typography>
          <TextfieldNome
            control={control}
            errors={errors}
            required={"Digite o nome do barbeiro"}
          />
          <TextfieldEmail
            control={control}
            errors={errors}
            required={"Digite o e-mail do barbeiro"}
          />
          <TextfieldCelular
            control={control}
            errors={errors}
            required={"Digite o celular do barbeiro"}
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
              "salvar"
            )}
          </Button>
        </Box>
      </Box>
    </Drawer>
  )
}
