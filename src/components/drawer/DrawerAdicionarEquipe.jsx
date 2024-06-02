import Drawer from "@mui/material/Drawer"
import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material"

import { useDrawer } from "../../context/DrawerContext"
import { Controller, useForm } from "react-hook-form"
import { useEffect, useState } from "react"
import { db, storage } from "../../services/firebase"
import { push, ref, set } from "firebase/database"
import { useSnackbarGlobal } from "../../context/SnackbarGlobalContext"
import {
  ref as refStorage,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage"
import InputMask from "react-input-mask"
import TextfieldNome from "../textfields/TextfieldNome"
import TextfieldEmail from "../textfields/TextfieldEmail"
import TextfieldCelular from "../textfields/TextfieldCelular"

export default function DrawerAdicionarEquipe() {
  const { isDrawerAdicionarEquipeOpen, setIsDrawerAdicionarEquipeOpen } =
    useDrawer()
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      nome: "",
      email: "",
      celular: "",
    },
  })

  const { handleClick, dispatch } = useSnackbarGlobal()

  const mostraSnackbar = tipoDispatch => {
    dispatch(tipoDispatch)
    handleClick()
  }

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
    try {
      const equipeListRef = ref(db, "equipe")
      const newEquipeRef = push(equipeListRef)
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
            Adicione o nome do barbeiro, email, celular e escolha a sua foto
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

          <Box display="flex">
            <input
              accept="image/png, image/gif, image/jpeg"
              type="file"
              onChange={handleFileChange}
            />
            {imagePreview && (
              <div>
                <img
                  src={imagePreview}
                  alt="Preview"
                  style={{ width: "200px", height: "auto" }}
                />
              </div>
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
