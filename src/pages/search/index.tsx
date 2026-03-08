import MovieItem from "../components/movie-item";
import movies from "../../../dummy.json";
import style from "./search.module.css";
import SearchableLayout from "../components/searchbar-layout";
import { ReactNode } from "react";

export default function Search() {
  return (
    <div className={style.container}>
      {movies.map((movie) => {
        return <MovieItem key={movie.id} {...movie}></MovieItem>;
      })}
    </div>
  );
}

Search.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
