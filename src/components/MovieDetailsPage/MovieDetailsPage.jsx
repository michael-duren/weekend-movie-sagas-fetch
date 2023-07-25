import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

export default function MovieDetailsPage() {
  const dispatch = useDispatch();
  const movieDetails = useSelector((state) => state.movieDetails);
  const { id } = useParams();

  useEffect(() => {
    dispatch({ type: "FETCH_MOVIE_DETAILS", payload: id });
  }, []);

  return (
    <main className="flex flex-col">
      {/*<div>{movieDetails.movie.name}</div>*/}
    </main>
  );
}
