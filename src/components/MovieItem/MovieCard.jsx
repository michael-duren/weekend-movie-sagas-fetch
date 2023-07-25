import React from "react";

export default function MovieCard({ movie }) {
  return (
    <div className="group cursor-pointer">
      <img
        className="rounded-md block w-64 h-auto transition-transform duration-500 transform-gpu group-hover:scale-105"
        src={movie.poster}
        alt={movie.title}
      />
      <h3 className="mt-4 opacity-70 group-hover:font-bold group-hover:opacity-100 font-semibold">
        {movie.title}
      </h3>
    </div>
  );
}
