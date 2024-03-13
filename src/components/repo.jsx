import { useEffect, useState } from "react";
import {
  Avatar,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  ThemeProvider,
  Pagination,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Box from "@mui/material/Box";
import { createTheme } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { fetchGitHubRepositoriesAsync } from "../store/actions/githubActions";
import Contributors from "./Contributors";

const theme = createTheme();

const Repo = () => {
  const dispatch = useDispatch();
  const repositories = useSelector((state) => state.github.repositories);
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedRepo, setExpandedRepo] = useState(null);

  useEffect(() => {
    dispatch(fetchGitHubRepositoriesAsync(currentPage));
  }, [dispatch, currentPage]);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const handleAccordionChange = (repo) => {
    setExpandedRepo((prevRepo) => (prevRepo === repo ? null : repo));
  };

  return (
    <ThemeProvider theme={theme}>
      {repositories.map((repo) => (
        <Accordion
          key={repo.id}
          expanded={expandedRepo === repo}
          onChange={() => handleAccordionChange(repo)}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                width: "50%",
                justifyContent: "center",
              }}
            >
              <Box
                sx={{
                  width: 64,
                  height: 64,
                  marginRight: 5,
                  borderRadius: 4,
                  overflow: "hidden",
                }}
              >
                <Avatar
                  src={repo.owner?.avatar_url}
                  sx={{
                    width: "100%",
                    height: "100%",
                  }}
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  flexGrow: 1,
                  gap: "10px",
                }}
              >
                <Typography variant="h6">{repo.name}</Typography>
                <Typography variant="body2">{repo.description}</Typography>

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    marginTop: 1,
                    gap: "20px",
                    width: "max-content",
                  }}
                >
                  <Box sx={{ marginRight: 2 }}>
                    <Typography variant="caption">
                      Stars: {repo.stargazers_count}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="caption">
                      Issues: {repo.open_issues_count}
                    </Typography>
                  </Box>

                  <Box sx={{ display: "flex" }}>
                    <Typography variant="caption">
                      {" "}
                      Last Pushed {repo.created_at} by {repo.owner?.login}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Contributors owner={repo.owner.login} repo={repo.name} />
          </AccordionDetails>
        </Accordion>
      ))}

      <Pagination count={20} page={currentPage} onChange={handlePageChange} />
    </ThemeProvider>
  );
};

export default Repo;
