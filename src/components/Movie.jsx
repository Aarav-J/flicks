// import Card from "react-bootstrap/Card";
import {
  Badge,
  Box,
  Image,
  Spacer,
  IconButton,
  ButtonGroup,
} from "@chakra-ui/react";
import { DeleteIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
// import { StarIcon } from "@chakra-ui/icons";
const Movie = ({ movie, remove, done }) => {
  let status = false;
  if (movie.Status === "Watched") {
    status = true;
  }
  return (
    <Box
      maxW="sm"
      maxH="45em"
      borderWidth="1px"
      borderRadius="lg"
      overflow="scroll"
    >
      <Image boxSize="100%" src={movie.Image} />

      <Box p="6">
        <Box display="flex" alignItems="baseline">
          <Badge
            borderRadius="full"
            px="2"
            colorScheme={status ? "teal" : "orange"}
          >
            {movie.Status}
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
          <ButtonGroup spacing="3" variant="ghost">
            <IconButton
              aria-label="Search database"
              icon={<DeleteIcon />}
              colorScheme="red"
              onClick={() => {
                remove(movie);
              }}
            />
            {/* <Spacer /> */}
            <IconButton
              aria-label="Search database"
              icon={status ? <ViewOffIcon /> : <ViewIcon />}
              colorScheme={status ? "orange" : "teal"}
              onClick={() => {
                done(movie);
              }}
            />
          </ButtonGroup>
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

export default Movie;
