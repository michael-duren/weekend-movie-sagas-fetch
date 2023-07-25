import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function MovieEditPage() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { movie } = useSelector((store) => store.movieDetails);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    dispatch({ type: "FETCH_MOVIE_DETAILS", payload: id });
  }, []);

  useEffect(() => {
    if (movie && movie.title && movie.description) {
      setTitle(movie.title);
      setDescription(movie.description);
    }
  }, [movie]);

  const onSubmit = () => {
    dispatch({ type: "EDIT_MOVIE", payload: { ...movie, title, description } });
  };

  return (
    <div className="">
      <div className="w-full flex">
        <button className="hover:text-red-600 font-semibold">
          <Link to={"/"}>Back</Link>
        </button>
      </div>
      {!movie ? (
        <p className="animate-pulse text-center mt-16">Loading Movie...</p>
      ) : (
        <main className="flex items-center justify-center mt-16">
          <form className="flex flex-col gap-8" onSubmit={onSubmit}>
            <div className="flex flex-col gap-4">
              <label htmlFor="title">Title</label>
              <input
                className="bg-gray-900 px-2 focus:bg-gray-800 rounded-xl py-1 focus:outline-none"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-4">
              <label htmlFor="title">Description</label>
              <textarea
                className="bg-gray-900 px-2 text-sm focus:bg-gray-800 rounded-xl py-1 focus:outline-none"
                value={description}
                cols={60}
                rows={15}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div>
              <button className="px-3 w-24 rounded-xl active:scale-105 transform transition-all text-sm duration-300 py-2 bg-green-600 bg-opacity-40 hover:bg-opacity-100">
                Submit
              </button>
            </div>
          </form>
        </main>
      )}
    </div>
  );
}
