import { db } from "../firebase-config";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { Grid, GridItem } from "@chakra-ui/react";

import Movie from "../components/Movie";
const Watched = () => {
  const [movies, setMovies] = useState([]);
  const moviesCollectionRef = collection(db, "movies");

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
  }, []);
  console.log(movies);
  console.log(isMobile);
  return (
    <>
      <Grid
        templateColumns={isMobile ? "repeat(1, 1fr)" : "repeat(3,1fr)"}
        gap={8}
      >
        {movies.map((movie) => {
          if (movie) {
            return (
              <GridItem mt="5" ms="5" me="5">
                <Movie
                  movie={movie}
                  remove={() => console.log("remove")}
                  done={() => setChange(!change)}
                />
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
