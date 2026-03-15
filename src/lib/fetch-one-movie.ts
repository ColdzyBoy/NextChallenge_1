import { MovieData } from "@/types";

export default async function fetchOneMovie(
  id: number,
): Promise<MovieData | null> {
  const url = `http://localhost:12345/movie/${id}`;

  try {
    const response = await fetch(url);

    if (!response) {
      throw new Error();
    }

    return response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}
