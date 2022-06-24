import "./App.css";
import { useEffect, useState, useRef } from "react";
import React from "react";
import axios from "axios";
import Movie from "./components/Movie";
// import Alert from "./components/Alert";
import {
  Grid,
  GridItem,
  Flex,
  Input,
  IconButton,
  useDisclosure,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

function App() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
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
        Title: data.Title,
        Year: data.Year,
        Runtime: data.Runtime,
        Plot: data.Plot,
        Image: data.Poster,
        Status: "Watching",
      };
      console.log(open);
      setMovies([...movies, newMovie]);
    } else {
      onOpen();
    }
    setInput("");
  };
  return (
    <div>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Movie Not Found
            </AlertDialogHeader>

            <AlertDialogBody>
              Movie was not in the database. Check your spelling or if that
              movie exists.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} colorScheme="green" onClick={onClose}>
                Ok
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

      <Flex mr="5" ml="5" mt="5">
        <Input
          variant="outline"
          placeholder="Search for movie"
          value={input}
          onChange={(event) => {
            setInput(event.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSubmit();
            }
          }}
        />
        <IconButton
          aria-label="Search database"
          icon={<SearchIcon />}
          onClick={() => {
            handleSubmit();
          }}
        />
      </Flex>
      <Grid templateColumns="repeat(3,1fr)" gap={8}>
        {movies.map((movie) => {
          return (
            <GridItem mt="5" ms="5" me="5">
              <Movie movie={movie} />
            </GridItem>
          );
        })}
      </Grid>
    </div>
  );
}

export default App;
