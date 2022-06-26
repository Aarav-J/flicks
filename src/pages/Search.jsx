import { useState, useRef } from "react";
import Form from "../components/Form";
import SearchMovie from "../components/SearchMovie";
import axios from "axios";
import { nanoid } from "nanoid";
import Alert from "../components/Alert";
import { Grid, GridItem, useDisclosure, AlertDialog } from "@chakra-ui/react";
const Search = () => {
  const [movies, setMovies] = useState([]);
  const [value, setValue] = useState("");
  const cancelRef = useRef();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleSubmit = async () => {
    const url = `http://www.omdbapi.com/`;
    const queryString = { apikey: "7f921e04", s: value };
    const response = await axios.get(url, { params: queryString });

    const data = response.data;
    if (data.Response !== "False") {
      const n_movies = data.Search.map(async (movie) => {
        const queryString = { apikey: "7f921e04", t: movie.Title };
        const response = await axios.get(url, { params: queryString });
        return {
          Id: nanoid(),
          Title: movie.Title,
          Runtime: response.data.Runtime,
          Year: movie.Year,
          Type: movie.Type,
          Image: movie.Poster,
          Plot: response.data.Plot,
          Status: "Watching",
        };
      });
      Promise.all(n_movies).then((films) => {
        setMovies(films);
      });
    } else {
      onOpen();
    }

    setValue("");
  };

  return (
    <>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <Alert
          cancelRef={cancelRef}
          onClose={onClose}
          m={`Could not find any movie similar in the database.`}
        />
      </AlertDialog>
      <Form handleSubmit={handleSubmit} value={value} change={setValue} />
      <Grid templateColumns="repeat(3,1fr)" gap={8}>
        {movies.map((movie, i) => {
          return (
            <GridItem key={i} mt="5" ms="5" me="5">
              <SearchMovie movie={movie} />
            </GridItem>
          );
        })}
      </Grid>
      ;
    </>
  );
};
export default Search;
