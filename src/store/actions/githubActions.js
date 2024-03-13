import { fetchGitHubRepositories } from "../api";
import {
  fetchRepositoriesStart,
  fetchRepositoriesSuccess,
  fetchRepositoriesFailure,
} from "../slices/githubSlice";

export const fetchGitHubRepositoriesAsync =
  (page = 1) =>
  async (dispatch) => {
    try {
      dispatch(fetchRepositoriesStart());

      const repositories = await fetchGitHubRepositories(page);

      dispatch(fetchRepositoriesSuccess(repositories));
    } catch (error) {
      dispatch(fetchRepositoriesFailure(error.message));
    }
  };
