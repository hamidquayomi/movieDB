import {useEffect, useState} from "react";

import MovieCard from './MovieCard';

import './App.css'
import searchIcon from './search.svg'

//API-Key : ff989c91

const API_URL = "http://www.omdbapi.com/?apikey=ff989c91&";

const movie1 = {
    "Title": "Blade",
    "Year": "1998",
    "imdbID": "tt0120611",
    "Type": "movie",
    "Poster": "https://m.media-amazon.com/images/M/MV5BYTU1ZTI0YjUtZGRlMS00MDU1LWFmZmItZWRiYTg5NTExMmRjXkEyXkFqcGdeQXVyMTUzMDg3MTQw._V1_SX300.jpg"
  }

const App = () => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`)
        const data = await response.json();

        setMovies(data.Search);
    }

    useEffect(() => {
        searchMovies('blade');
    },[])

    return (
        <div className="app">
            <h1>MovieLand</h1>

            <div className="search">
                <input
                placeholder="Search for movie"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                />
                <img
                src={searchIcon}
                alt="search"
                onClick={() => searchMovies(searchTerm)}
                />
            </div>

            {
                movies?.length > 0
                 ? (
                    <div className="container">
                        {movies.map((movie) => (
                            <MovieCard movie={movie}/>
                        ))}
                    </div>
                 ) : (
                    <div className="empty">
                        <h2>No movies found</h2>
                        </div>
                 )
            }

        </div>
    );
}

export default App;