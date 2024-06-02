import { Backdrop, CircularProgress } from "@mui/material"

const Loading = () => {
  return (
    <Backdrop
      sx={{
        display: "grid",
        placeContent: "center",
        color: "#fff",
        zIndex: 99,
      }}
      open={true}
    >
      <CircularProgress color="inherit" size={60} />
    </Backdrop>
  )
}

export default Loading
