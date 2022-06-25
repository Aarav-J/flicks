import "../App.css";
import { useState, useRef } from "react";
import React from "react";
import axios from "axios";
import Movie from "../components/Movie";
import Form from "../components/Form";
import Alert from "../components/Alert";

import { nanoid } from "nanoid";
// import Alert from "./components/Alert";
import { Grid, GridItem, useDisclosure, AlertDialog } from "@chakra-ui/react";

function App() {
  const [input, setInput] = useState("");
  const [change, setChange] = useState(false);
  const [movies, setMovies] = useState([]);
  const cancelRef = useRef();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleSubmit = async () => {
    const url = `http://www.omdbapi.com/`;
    const queryString = { apikey: "7f921e04", t: input };
    const response = await axios.get(url, { params: queryString });

    const data = response.data;
    console.log(data);
    if (data.Response !== "False") {
      const newMovie = {
        Id: nanoid(),
        Title: data.Title,
        Year: data.Year,
        Runtime: data.Runtime,
        Plot: data.Plot,
        Image: data.Poster,
        Status: "Watching",
      };

      setMovies([...movies, newMovie]);
    } else {
      onOpen();
    }
    setInput("");
  };
  const remove = (movie) => {
    const newMovies = movies.filter((film) => film.Id !== movie.Id);
    setMovies(newMovies);
  };

  const done = (movie) => {
    let status = false;
    if (movie.Status === "Watching") {
      status = false;
    } else {
      status = true;
    }
    const newMovies = movies.map((film) => {
      if (film.Id === movie.Id) {
        return status
          ? { ...film, Status: "Watching" }
          : { ...film, Status: "Watched" };
      }
      return film;
    });
    console.log(newMovies);
    setMovies(newMovies);
  };

  return (
    <div>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <Alert
          cancelRef={cancelRef}
          onClose={onClose}
          m={`Movie was not found in the database.`}
        />
      </AlertDialog>

      <Form handleSubmit={handleSubmit} value={input} change={setInput} />

      <Grid templateColumns="repeat(3,1fr)" gap={8}>
        {movies.map((movie, i) => {
          return (
            <GridItem mt="5" ms="5" me="5">
              <Movie key={i} movie={movie} remove={remove} done={done} />
            </GridItem>
          );
        })}
      </Grid>
    </div>
  );
}

// {handleSubmit: value, value: input, }

export default App;
