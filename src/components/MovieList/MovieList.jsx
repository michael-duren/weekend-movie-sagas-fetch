import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MovieCard from "../MovieItem/MovieCard";

function MovieList() {
  const dispatch = useDispatch();
  const movies = useSelector((store) => store.movies);

  useEffect(() => {
    dispatch({ type: "FETCH_MOVIES" });
  }, []);

  return (
    <main className="flex flex-col">
      <div>
        <h2 className="font-bebas text-4xl mb-8">Movie List</h2>
      </div>
      <section className="flex justify-center w-full flex-wrap gap-8 items-center">
        {movies.map((movie) => {
          return (
            <Fragment key={movie.id}>
              <MovieCard movie={movie} />
            </Fragment>
          );
        })}
      </section>
    </main>
  );
}

export default MovieList;
