const express = require("express");
const router = express.Router();
const pool = require("../modules/pool");

router.get("/", (req, res) => {
  const query = `SELECT * FROM movies ORDER BY "title" ASC`;
  pool
    .query(query)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.log("ERROR: Get all movies", err);
      res.sendStatus(500);
    });
});

router.get("/:id", async (req, res) => {
  const id = req.params.id; // get id of movie

  try {
    /*
     * Get Movie Details
     */
    const movieQuery = `SELECT * FROM movies WHERE id=$1`;
    const movieResult = await pool.query(movieQuery, [id]);
    const movie = await movieResult.rows[0];

    /*
     * Get Genres associated with movie
     */
    const genreQuery = `SELECT genres.name as genre
                        FROM movies
                                 JOIN movies_genres ON movies.id = movies_genres.movie_id
                                 JOIN genres ON genres.id = movies_genres.genre_id
                        WHERE movies.id = $1;`;

    const genresResult = await pool.query(genreQuery, [id]);
    const genres = genresResult.rows;

    res.send({ movie, genres });
  } catch (e) {
    console.log("ERROR: Get movie details", e);
    res.sendStatus(500);
  }
});

router.post("/", (req, res) => {
  console.log(req.body);
  // RETURNING "id" will give us back the id of the created movie
  const insertMovieQuery = `
  INSERT INTO "movies" ("title", "poster", "description")
  VALUES ($1, $2, $3)
  RETURNING "id";`;

  // FIRST QUERY MAKES MOVIE
  pool
    .query(insertMovieQuery, [
      req.body.title,
      req.body.poster,
      req.body.description,
    ])
    .then((result) => {
      console.log("New Movie Id:", result.rows[0].id); //ID IS HERE!

      const createdMovieId = result.rows[0].id;

      // Now handle the genre reference
      const insertMovieGenreQuery = `
      INSERT INTO "movies_genres" ("movie_id", "genre_id")
      VALUES  ($1, $2);
      `;
      // SECOND QUERY ADDS GENRE FOR THAT NEW MOVIE
      pool
        .query(insertMovieGenreQuery, [createdMovieId, req.body.genre_id])
        .then((result) => {
          //Now that both are done, send back success!
          res.sendStatus(201);
        })
        .catch((err) => {
          // catch for second query
          console.log(err);
          res.sendStatus(500);
        });

      // Catch for first query
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

router.put("/:id", (req, res) => {
  const movieId = req.params.id;
  const updatedMovie = req.body;

  const queryText = `UPDATE movies SET "title" = $1, "description" = $2 WHERE id = $3;`;

  pool
    .query(queryText, [updatedMovie.title, updatedMovie.description, movieId])
    .then((response) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log("Error updating movie", err);
      res.sendStatus(500);
    });
});

module.exports = router;
