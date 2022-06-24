// import Card from "react-bootstrap/Card";
import { Badge, Box, Image } from "@chakra-ui/react";
// import { StarIcon } from "@chakra-ui/icons";
const Movie = (movie) => {
  return (
    <Box
      maxW="sm"
      maxH="45em"
      borderWidth="1px"
      borderRadius="lg"
      overflow="scroll"
      as="button"
    >
      <Image boxSize="100%" src={movie.movie.Image} />

      <Box p="6">
        <Box display="flex" alignItems="baseline">
          <Badge borderRadius="full" px="2" colorScheme="orange">
            {movie.movie.Status}
          </Badge>
          <Box
            color="gray.500"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="xs"
            textTransform="uppercase"
            ml="2"
          >
            {movie.movie.Runtime}
          </Box>
        </Box>

        <Box
          mt="1"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          noOfLines={2}
        >
          {movie.movie.Title}({movie.movie.Year})
        </Box>

        <Box>{movie.movie.Plot}</Box>
      </Box>
    </Box>
  );
};

export default Movie;
