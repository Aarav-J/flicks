// import Card from "react-bootstrap/Card";
import { Badge, Box, Image } from "@chakra-ui/react";
// import { DeleteIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
// import { StarIcon } from "@chakra-ui/icons";
const SearchMovie = ({ movie }) => {
  return (
    <Box
      maxW="sm"
      maxH="45em"
      borderWidth="1px"
      borderRadius="lg"
      overflow="scroll"
    >
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
