import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Repo from "./components/repo";

function App() {
  return (
    <Box
      sx={{
        padding: 10,
        border: 1,
        borderColor: "black",
      }}
    >
      <Typography
        variant="h5"
        sx={{ textAlign: "center" }}
        marginTop={"-50px"}
        padding={5}
      >
        Most Starred Repos
      </Typography>
      <Repo />
    </Box>
  );
}

export default App;
