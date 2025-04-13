import React from "react";
export default function WatchedMovieList({ watched, onDeleteMovie }) {
  return (
    <ul className="list">
      {watched?.map((movie) => (
        <li key={movie.imdbID}>
          <img src={movie.poster} alt={`${movie.title} poster`} />
          <h3>{movie.title}</h3>
          <div>
            <p>
              <span>⭐️</span>
              <span>{movie.imdbRating} </span>
            </p>
            <p>
              <span>🌟</span>
              <span>{movie.userRating}</span>
            </p>
            <p>
              <span>⏳</span>
              <span>{movie.runtime} min</span>
                 
              <button
                className="btn-delete"
                onClick={() => onDeleteMovie(movie.imdbID)}
              >
                X
              </button>
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}
