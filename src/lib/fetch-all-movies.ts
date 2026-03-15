import { MovieData } from "@/types";

export default async function fetchAllMovies(q?: string): Promise<MovieData[]> {
  let url = `http://localhost:12345/movie`;

  if (q) {
    url += `/search?q=${q}`;
  }

  try {
    const response = await fetch(url);

    if (!response) {
      throw new Error();
    }

    return response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}
