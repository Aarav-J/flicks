import { db } from "../firebase-config";
import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { Grid, GridItem } from "@chakra-ui/react";
import axios from "axios";
import { nanoid } from "nanoid";
import Form from "../components/Form";
import Movie from "../components/Movie";
const Watched = () => {
  const [movies, setMovies] = useState([]);
  const moviesCollectionRef = collection(db, "movies");
  const [value, setValue] = useState("");
  const [change, setChange] = useState(false);
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

  const handleSubmit = async () => {
    const url = `http://www.omdbapi.com/`;
    const queryString = { apikey: process.env.REACT_APP_API_KEY, t: value };
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
        Status: "Watched",
      };
      await addDoc(moviesCollectionRef, newMovie);
      setChange(!change);
      setValue("");
    }
  };

  const remove = async (movie) => {
    const del_movies = doc(db, "movies", movie.id);
    await deleteDoc(del_movies);
    setChange(!change);
  };
  const undone = async (movie) => {
    const change_movie = doc(db, "movies", movie.id);
    const new_field = { Status: "Watching" };
    await updateDoc(change_movie, new_field);
    setChange(!change);
  };
  useEffect(() => {
    const getMovies = async () => {
      const data = await getDocs(moviesCollectionRef);
      setMovies(
        data.docs.map((doc) => {
          if (doc.data().Status === "Watched") {
            return { ...doc.data(), id: doc.id };
          }
          return null;
        })
      );
    };
    getMovies();
  }, [change]);
  console.log(movies);
  console.log(isMobile);
  return (
    <>
      <Form handleSubmit={handleSubmit} value={value} change={setValue} />
      <Grid
        templateColumns={isMobile ? "repeat(1, 1fr)" : "repeat(3,1fr)"}
        gap={8}
      >
        {movies.map((movie) => {
          if (movie) {
            return (
              <GridItem mt="5" ms="5" me="5">
                <Movie movie={movie} remove={remove} done={undone} />
              </GridItem>
            );
          } else {
            return null;
          }
        })}
      </Grid>
    </>
  );
};

export default Watched;
