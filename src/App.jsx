import "./App.css";
import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";
import Movie from "./components/Movie";

function App() {
  const [input, setInput] = useState("");
  const [movies, setMovies] = useState([]);
  const handleSubmit = async () => {
    const url = `http://www.omdbapi.com/`;
    const queryString = { apikey: "7f921e04", t: input };
    const response = await axios.get(url, { params: queryString });
    const data = response.data;

    const newMovie = {
      Title: data.Title,
      Year: data.Year,
      Runtime: data.Runtime,
      Plot: data.Plot,
      Image: data.Poster,
      Status: "Watching",
    };
    setMovies([...movies, newMovie]);

    setInput("");
  };
  return (
    <div>
      <input
        type="search"
        placeholder="Search for movie"
        value={input}
        onChange={(event) => {
          setInput(event.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key == "Enter") {
            handleSubmit();
          }
        }}
      />

      <button
        onClick={() => {
          handleSubmit();
        }}
      >
        Submit
      </button>

      {movies.map((movie) => {
        return <Movie movie={movie} />;
      })}
    </div>
  );
}

export default App;
