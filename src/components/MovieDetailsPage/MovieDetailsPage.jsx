import { Link, useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

export default function MovieDetailsPage() {
  const dispatch = useDispatch();
  const { movie, genres } = useSelector((state) => state.movieDetails);
  const { id } = useParams();
  const history = useHistory();
  const toEditPage = () => {
    history.push(`/edit/${id}`);
  };

  useEffect(() => {
    dispatch({ type: "FETCH_MOVIE_DETAILS", payload: id });
  }, []);

  return (
    <div>
      <div className="w-full flex">
        <button className="hover:text-red-600 font-semibold">
          <Link to={"/"}>Back</Link>
        </button>
      </div>
      <main className="flex mt-16 justify-evenly">
        {!movie ? (
          <p className="animate-pulse">Loading...</p>
        ) : (
          <>
            {/*Left Side */}
            <div className="min-w-[20rem]">
              <h2 className="text-7xl max-w-[20rem] mb-8 font-bebas">
                {movie.title}
              </h2>
              <div className="flex justify-between mb-8">
                <button className="bg-green-400 text-sm px-3 py-2 hover:bg-opacity-75 rounded-xl bg-opacity-30">
                  Watch
                </button>
                <button
                  onClick={toEditPage}
                  className="bg-orange-400 text-sm px-3 py-2 hover:bg-opacity-75 rounded-xl bg-opacity-30"
                >
                  Edit
                </button>
              </div>
              <div className="max-w-[20rem]">
                <p>{movie.description}</p>
              </div>
            </div>
            {/* Right Side */}
            <div className="min-w-[20rem]">
              <img className="h-[30rem]" src={movie.poster} alt={movie.title} />

              <div className="flex justify-evenly w-full mt-8">
                {genres.map((genreName) => {
                  const { genre } = genreName;
                  return (
                    <div
                      className="px-3 cursor-pointer hover:scale-105 font-semibold uppercase text-sm rounded-xl py-2 bg-red-600 bg-opacity-40"
                      key={genre}
                    >
                      {genre}
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
