import { SpringGrid, makeResponsive, measureItems } from "react-stonecutter";
import MovieCard from "./MovieCard";

const Grid = makeResponsive(measureItems(SpringGrid), {
  maxWidth: 1920,
  minPadding: 100,
});

const MoviesGrid = ({ movies }) => {
  return (
    <Grid
      component="ul"
      columns={20}
      gutterWidth={20}
      gutterHeight={20}
      columnWidth={150}
      itemHeight={200}
      springConfig={{ stiffness: 170, damping: 26 }}
    >
      {movies.map((movie, index) => (
        <li
          key={index}
          style={{
            listStyle: "none",
          }}
        >
          <MovieCard movieDetails={movie} />
        </li>
      ))}
    </Grid>
  );
};

export default MoviesGrid;
