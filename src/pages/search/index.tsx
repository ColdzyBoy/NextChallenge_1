import MovieItem from "../../components/movie-item";
import style from "./search.module.css";
import SearchableLayout from "../../components/searchbar-layout";
import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { MovieData } from "@/types";
import fetchAllMovies from "@/lib/fetch-all-movies";
import Head from "next/head";

export default function Search() {
  const [movies, setMovies] = useState<MovieData[]>([]);
  const router = useRouter();
  const { q } = router.query;

  async function fetchSearchMovie() {
    const response = await fetchAllMovies(q as string);

    setMovies(response);
  }

  useEffect(() => {
    if (q) {
      fetchSearchMovie();
    }
  }, [q]);

  return (
    <>
      <Head>
        <title>한입무비 - 검색결과</title>
        <meta property="og:image" content="/thumbnail.png" />
        <meta property="og:title" content="한입무비 - 검색결과" />
        <meta
          property="og:description"
          content="한입 무비에 등록된 영화를 만나보세요"
        />
      </Head>
      <div className={style.container}>
        {movies.map((movie) => {
          return <MovieItem key={movie.id} {...movie}></MovieItem>;
        })}
      </div>
    </>
  );
}

Search.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
