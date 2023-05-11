import "../App.css";
import { useState, useRef, useEffect } from "react";
import React from "react";
import axios from "axios";
import Movie from "../components/Movie";
import Form from "../components/Form";
import Alert from "../components/Alert";
import toast, { Toaster } from "react-hot-toast";
import { db } from "../firebase-config";

import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { nanoid } from "nanoid";
// import Alert from "./components/Alert";
import { Grid, GridItem, useDisclosure, AlertDialog } from "@chakra-ui/react";

function App() {
  const deleted = () =>
    toast.success("Deleted the movie", {
      icon: "🗑️",
      id: "delete",
      style: {
        borderRadius: "50px",
        color: "black",
      },
      iconTheme: {
        primary: "red",
      },
    });
  const finished = () =>
    toast.success("Finished the movie", {
      id: "done",
      style: {
        borderRadius: "50px",
        color: "black",
      },
      iconTheme: {
        primary: "green",
      },
    });
  const [input, setInput] = useState("");
  const [change, setChange] = useState(false);

  const [movies, setMovies] = useState([]);

  const cancelRef = useRef();
  const [width, setWidth] = useState(window.innerWidth);
  const handleWindowSizeChange = () => {
    setWidth(window.innerWidth);
  };
  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  const isMobile = width <= 700;

  const moviesCollectionRef = collection(db, "movies");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSubmit = async () => {
    const url = `http://www.omdbapi.com/`;
    const queryString = { apikey: process.env.REACT_APP_API_KEY, t: input };
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
        Type: data.Type,
        Status: "Watching",
      };
      await addDoc(moviesCollectionRef, newMovie);
      setChange(!change);
    } else {
      onOpen();
    }
    setInput("");
  };
  const remove = async (movie) => {
    const del_movies = doc(db, "movies", movie.id);
    await deleteDoc(del_movies);
    setChange(!change);
    deleted();
  };

  const done = async (movie) => {
    let status = false;

    if (movie.Status !== "Watching") {
      status = true;
    }
    const change_movie = doc(db, "movies", movie.id);
    const new_field = { Status: status ? "Watching" : "Watched" };
    await updateDoc(change_movie, new_field);
    setChange(!change);
    finished();
  };

  const getMovies = async () => {
    const data = await getDocs(moviesCollectionRef);

    setMovies(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };
  useEffect(() => {
    console.log("mounted");
    getMovies();
  }, [change]);

  return (
    <div>
      <Toaster position="top-center" />
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

      <Grid
        templateColumns={isMobile ? "repeat(1,1fr)" : "repeat(3,1fr)"}
        gap={8}
      >
        {movies.map((movie, i) => {
          if (movie.Status === "Watching") {
            return (
              <GridItem mt="5" ms="5" me="5">
                <Movie key={i} movie={movie} remove={remove} done={done} />
              </GridItem>
            );
          } else {
            return null;
          }
        })}
      </Grid>
    </div>
  );
}

// {handleSubmit: value, value: input, }

export default App;
