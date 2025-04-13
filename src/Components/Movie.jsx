import React from "react";
export default function Movie({ movie, onSelectedMovie }) {
  return (
    <li onClick={() => onSelectedMovie(movie.imdbID)} key={movie.Title}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}
