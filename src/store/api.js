/* eslint-disable no-useless-catch */

export const fetchGitHubRepositories = async (page = 1) => {
  try {
    const apiUrl = `https://api.github.com/search/repositories?q=created:>2022-11-28&sort=stars&order=desc&page=${page}`;
    const token = process.env.accessToken_git;

    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }

    const data = await response.json();
    return data.items;
  } catch (error) {
    throw error;
  }
};
