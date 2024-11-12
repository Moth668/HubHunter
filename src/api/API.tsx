import { Candidate } from "../interfaces/Candidate.interface";

// Function to fetch a list of random users from GitHub
const searchGithub = async (): Promise<Candidate[]> => {
  try {
    const start = Math.floor(Math.random() * 100000000) + 1;
    const response = await fetch(`https://api.github.com/users?since=${start}`, {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
      },
    });

    if (!response.ok) {
      throw new Error("Invalid API response, check the network tab");
    }

    const data: Candidate[] = await response.json();
    return data;
  } catch (err) {
    console.error("An error occurred:", err);
    return []; // Return an empty array on error
  }
};

// Function to fetch a specific user by username
const searchGithubUser = async (username: string): Promise<Candidate | null> => {
  try {
    const response = await fetch(`https://api.github.com/users/${username}`, {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
      },
    });

    if (!response.ok) {
      throw new Error("Invalid API response, check the network tab");
    }

    const data: Candidate = await response.json();
    return data;
  } catch (err) {
    console.error("An error occurred:", err);
    return null; // Return null on error
  }
};

export { searchGithub, searchGithubUser };
