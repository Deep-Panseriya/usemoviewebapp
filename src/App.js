import React, { useState, useEffect } from "react";
import Navbar, { NumResult, Search } from "./Components/Navbar";
import Main from "./Components/Main";
import ListBox from "./Components/ListBox";
import MovieLists from "./Components/MovieLists";
import WatchedSummary from "./Components/WatchedSummary";
import WatchedMovieList from "./Components/WatchedMovieList";
import Loader from "./Components/Loader";
import ErrorMessage from "./Components/ErrorMessage";
import MovieDetails from "./Components/MovieDetails";

const KEY = "90c56b81";
function App() {
    const [movies, setMovies] = useState([]);
    //const [watched, setWatched] = useState([]);
    const [query, setQuery] = useState("");
    const [error, setError] = useState("");
    const [isloading, setIsLoading] = useState(false);
    const [selectedId, setSelectedId] = useState(null);

    const [watched, setWatched] = useState(function() {
        const storedElements = localStorage.getItem("watched");
        return JSON.parse(storedElements)
    });
    //select movie part
    function handleSelectMovie(movie) {
        setSelectedId((selectedId) => (selectedId?.imdbID === movie ? null : movie));
    }

    function handleAddMovie(movie) {
        setWatched((watched) => [...watched, movie]);
        //localStorage.setItem("watched", JSON.stringify([...watched, movie]));

    }
    function handleCloseMovie() {
        setSelectedId(null)
    }

    function handleDeleteWatched(id) {
        setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
    }
    useEffect(() => {
        localStorage.setItem("watched", JSON.stringify(watched || []));
      }, [watched]);
      

    useEffect(() => {
        async function fetchMovies() {
            const controller = new AbortController();
            try {
                setIsLoading(true);
                setError(" ");
                const res = await fetch(
                    `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
                    { signal: controller.signal }
                );

                if (!res.ok)
                    throw new Error("Something went wrong with fetching movies");

                const data = await res.json();
                if (data.Response === "False") throw new Error("Movie not found");
                setMovies(data.Search);
                setError("");
            } catch (error) {
                if (error.name !== "AbortError") setError(error.message);
            } finally {
                setIsLoading(false);
            }
            if (query.length < 3) {
                setMovies([]);
                setError("");
                return;
            }

            return () => {
                controller.abort();
            };
        }
        fetchMovies();
    }, [query]);

    // useEffect(

    //     function () {
    //       const controller = new AbortController();

    //       async function fetchMovies() {
    //         try {
    //           setIsLoading(true);
    //           setError("");

    //           const res = await fetch(
    //             `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
    //             { signal: controller.signal }
    //           );

    //           if (!res.ok)
    //             throw new Error("Something went wrong with fetching movies");

    //           const data = await res.json();
    //           if (data.Response === "False") throw new Error("Movie not found");

    //           setMovies(data.Search);
    //           setError("");
    //         } catch (err) {
    //           if (err.name !== "AbortError") {
    //             console.log(err.message);
    //             setError(err.message);
    //           }
    //         } finally {
    //           setIsLoading(false);
    //         }
    //       }

    //       if (query.length < 3) {
    //         setMovies([]);
    //         setError("");
    //         return;
    //       }
    //       fetchMovies();

    //       return function () {
    //         controller.abort();
    //       };
    //     },
    //     [query]
    //   );

    return (
        <>
            <Navbar>
                <Search query={query} setQuery={setQuery} />
                <NumResult movies={movies} />
            </Navbar>

            <Main>
                <ListBox>
                    {isloading && <Loader />}
                    {!isloading && !error && (
                        <MovieLists movies={movies} onSelectedMovie={handleSelectMovie} />
                    )}
                    {error && <ErrorMessage message={error} />}
                </ListBox>

                <ListBox>
                    {selectedId ? (
                        <MovieDetails selectedId={selectedId}
                            onCloseMovie={handleCloseMovie}
                            onAddWatched={handleAddMovie}

                            watched={watched} />
                    ) : (
                        <>
                            <WatchedSummary watched={watched} />
                            <WatchedMovieList watched={watched}
                                onDeleteMovie={handleDeleteWatched} />
                        </>
                    )}
                </ListBox>
            </Main>
        </>
    );
}

export default App;
