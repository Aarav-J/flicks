// import Card from "react-bootstrap/Card";
import { Badge, Box, Image, Spacer, IconButton } from "@chakra-ui/react";
import { PlusSquareIcon } from "@chakra-ui/icons";
import { db } from "../firebase-config";
import { collection, addDoc } from "firebase/firestore";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const SearchMovie = ({ movie }) => {
  const navigate = useNavigate();
  const moviesCollectionRef = collection(db, "movies");
  const added = () => toast("Added to watchlist.");
  const add = async (movie) => {
    await addDoc(moviesCollectionRef, movie);
    navigate("/");
  };
  return (
    <Box
      maxW="sm"
      maxH="45em"
      borderWidth="1px"
      borderRadius="lg"
      overflow="scroll"
    >
      <Toaster position="top-center" />
      <Image boxSize="100%" src={movie.Image} alt={movie.Title} />

      <Box p="6">
        <Box display="flex" alignItems="baseline">
          <Badge borderRadius="full" px="2" colorScheme={"purple"}>
            {movie.Type}
          </Badge>
          <Box
            color="gray.500"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="xs"
            textTransform="uppercase"
            ml="2"
          >
            {movie.Runtime}
          </Box>

          <Spacer />
          <IconButton
            aria-label="Add"
            icon={<PlusSquareIcon />}
            variant="ghost"
            colorScheme="green"
            onClick={() => {
              add(movie);
              added();
            }}
          />
        </Box>

        <Box
          mt="1"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          noOfLines={2}
        >
          {movie.Title}({movie.Year})
        </Box>

        <Box>{movie.Plot}</Box>
      </Box>
    </Box>
  );
};

export default SearchMovie;
