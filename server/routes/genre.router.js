const express = require("express");
const router = express.Router();
const pool = require("../modules/pool");

router.get("/", async (req, res) => {
  const query = `SELECT * FROM "genres" ORDER BY "name" ASC;`;
  try {
    const genres = await pool.query(query);
    res.send(genres.rows);
  } catch (e) {
    console.log("error in GET /api/genre", e);
    res.sendStatus(500);
  }
});

module.exports = router;
