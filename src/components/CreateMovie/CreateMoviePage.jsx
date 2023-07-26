import { Link, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function CreateMoviePage() {
  const history = useHistory();
  const dispatch = useDispatch();
  const genres = useSelector((store) => store.genres);
  const [genreArr, setGenreArr] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageURL, setImageURL] = useState("");

  console.log(genreArr);

  useEffect(() => {
    dispatch({ type: "FETCH_GENRES" });
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch({
      type: "CREATE_MOVIE",
      payload: { title, description, poster: imageURL, genres: genreArr },
    });
    history.push(`/`);
  };

  const toggleGenre = (genreId) => {
    if (genreArr.includes(genreId)) {
      console.log("removing genre");
      setGenreArr(genreArr.filter((id) => id !== genreId));
      return;
    }
    setGenreArr([...genreArr, genreId]);
  };

  return (
    <div className="">
      <div className="w-full flex">
        <button className="hover:text-red-600 font-semibold">
          <Link to={"/"}>Back</Link>
        </button>
      </div>
      <main className="flex md:flex-row flex-col  items-center justify-evenly mt-16">
        {/* FORM */}
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
            <label htmlFor="title">Image URL</label>
            <input
              className="bg-gray-900 px-2 focus:bg-gray-800 rounded-xl py-1 focus:outline-none"
              type="text"
              value={imageURL}
              onChange={(e) => setImageURL(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-4">
            <label htmlFor="title">Genres</label>
            <div className="grid grid-cols-4 gap-y-2 gap-x-2">
              {genres.map((genre) => {
                const isSelected = genreArr.includes(genre.id);
                return (
                  <div
                    onClick={() => toggleGenre(genre.id)}
                    key={genre.id}
                    className={`text-xs ${
                      isSelected ? "border-2 border-white" : ""
                    } bg-opacity-60 hover:bg-opacity-100 rounded-xl py-2 text-center bg-red-500 cursor-pointer`}
                  >
                    {genre.name}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <label htmlFor="title">Description</label>
            <textarea
              className="bg-gray-900 px-2 text-sm focus:bg-gray-800 rounded-xl py-1 focus:outline-none"
              value={description}
              cols={60}
              rows={10}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="flex justify-between">
            <button
              type="submit"
              className="px-3 w-24 rounded-xl active:scale-105 transform transition-all text-sm duration-300 py-2 bg-green-600 bg-opacity-40 hover:bg-opacity-100"
            >
              Submit
            </button>
            <Link to={`/`}>
              <button
                type="button"
                className="px-3 w-24 rounded-xl active:scale-105 transform transition-all text-sm duration-300 py-2 bg-red-600 bg-opacity-40 hover:bg-opacity-100"
              >
                Cancel
              </button>
            </Link>
          </div>
        </form>
        {/*  PREVIEW */}
        <div>
          <div className="min-w-[20rem]">
            <h2 className="text-7xl max-w-[20rem] mb-8 font-bebas">{title}</h2>
            <div className="max-w-[20rem]">
              <p>{description}</p>
            </div>
            <div className="mt-8">
              {imageURL && (
                <img
                  src={imageURL}
                  className="max-w-[20rem] rounded-xl"
                  alt="Movie Poster Goes Here"
                />
              )}
            </div>
            {
              // Display selected Genres in preview
              <div className="grid grid-cols-2 gap-2 mt-4">
                {genreArr.map((genreId) => {
                  return (
                    <div
                      className="bg-opacity-60 hover:bg-opacity-100 rounded-xl py-2 text-center bg-red-500 cursor-pointer"
                      key={genreId}
                    >
                      {genres.filter((genre) => genre.id === genreId)[0].name}
                    </div>
                  );
                })}
              </div>
            }
          </div>
        </div>
      </main>
    </div>
  );
}
