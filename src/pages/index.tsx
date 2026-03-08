import { ReactNode } from "react";
import SearchbarLayout from "./components/searchbar-layout";
import movies from "../../dummy.json";
import MovieItem from "./components/movie-item";
import style from "./index.module.css";

export default function Home() {
  return (
    <div>
      <section>
        <h3>지금 가장 추천하는 영화</h3>
        <div className={style.reco_container}>
          {movies.slice(0, 3).map((movie) => (
            <MovieItem key={`recomovie-${movie.id}`} {...movie} />
          ))}
        </div>
      </section>
      <section>
        <h3>등록된 모든 영화</h3>
        <div className={style.all_container}>
          {movies.map((movie) => {
            return <MovieItem key={movie.id} {...movie}></MovieItem>;
          })}
        </div>
      </section>
    </div>
  );
}

Home.getLayout = (page: ReactNode) => {
  return <SearchbarLayout>{page}</SearchbarLayout>;
};
