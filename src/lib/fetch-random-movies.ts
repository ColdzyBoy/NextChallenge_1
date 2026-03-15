import { MovieData } from "@/types";

export default async function fetchRandomMovies(): Promise<MovieData[]> {
  const url = `http://localhost:12345/movie/random`;

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
