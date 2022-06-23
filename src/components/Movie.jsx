import Card from "react-bootstrap/Card";

const Movie = (movie) => {
  console.log("movie:", movie);
  return (
    <div>
      <Card style={{ width: "18rem" }} className="movie" bg="light">
        <Card.Img variant="top" src={movie.movie.Image} className="image" />
        <Card.Body>
          <Card.Title>
            {movie.movie.Title}({movie.movie.Year})
          </Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            {movie.movie.Runtime}
          </Card.Subtitle>

          <Card.Text>{movie.movie.Plot}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Movie;
