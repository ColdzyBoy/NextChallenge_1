import { ReactNode } from "react";
import SearchbarLayout from "../components/searchbar-layout";
import MovieItem from "../components/movie-item";
import style from "./index.module.css";
import fetchRandomMovies from "@/lib/fetch-random-movies";
import fetchAllMovies from "@/lib/fetch-all-movies";
import { InferGetStaticPropsType } from "next";
import Head from "next/head";

export async function getStaticProps() {
  const [randomMovies, allMovies] = await Promise.all([
    fetchRandomMovies(),
    fetchAllMovies(),
  ]);

  return {
    props: {
      randomMovies,
      allMovies,
    },
    revalidate: 3,
  };
}

export default function Home({
  randomMovies,
  allMovies,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Head>
        <title>한입무비</title>
        <meta property="og:image" content="/thumbnail.png" />
        <meta property="og:title" content="한입무비" />
        <meta
          property="og:description"
          content="한입 무비에 등록된 영화를 만나보세요"
        />
      </Head>
      <div>
        <section>
          <h3>지금 가장 추천하는 영화</h3>
          <div className={style.reco_container}>
            {randomMovies.slice(0, 3).map((movie) => (
              <MovieItem key={`recomovie-${movie.id}`} {...movie} />
            ))}
          </div>
        </section>
        <section>
          <h3>등록된 모든 영화</h3>
          <div className={style.all_container}>
            {allMovies.map((movie) => {
              return <MovieItem key={movie.id} {...movie}></MovieItem>;
            })}
          </div>
        </section>
      </div>
    </>
  );
}

Home.getLayout = (page: ReactNode) => {
  return <SearchbarLayout>{page}</SearchbarLayout>;
};
