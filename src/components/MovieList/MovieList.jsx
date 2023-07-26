import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MovieCard from "../MovieItem/MovieCard";
import { Link } from "react-router-dom";

function MovieList() {
  const dispatch = useDispatch();
  const movies = useSelector((store) => store.movies);

  useEffect(() => {
    dispatch({ type: "FETCH_MOVIES" });
  }, []);

  return (
    <main className="flex flex-col">
      <div className="mb-16 mx-24 font-bebas text-3xl md:text-4xl flex justify-between">
        <h2>Movie List</h2>
        <Link
          to={"/create-movie"}
          className="text-green-600 hover:text-green-500"
        >
          Add Movie
        </Link>
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
