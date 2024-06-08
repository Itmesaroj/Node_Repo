const express = require("express");
const router = express.Router();
const MovieModel = require("./Schema");

router.get('/movie', async (req, res) => {
    try {
      const { title, rating, q, sortBy } = req.query;
      console.log(sortBy);
      const filter = {};
      if (title) filter.title = title;
      if (rating) filter.rating = rating;
      if (q) filter.title = { $regex: q, $options: 'i' };
      console.log(filter)
      const sort = {};
      if (sortBy) sort[sortBy] = 1;
      console.log(sort);
      const movies = await MovieModel.find(filter).sort(sort);
      console.log(movies);
      res.json(movies);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

  router.get('/movie/:id', async (req, res) => {
    try {
      const movie = await MovieModel.findById(req.params.id);
      if (!movie) return res.status(404).json({ message: 'Movie not found' });
      res.json(movie);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
router.post("/movie", async (req, res) => {
    try {
        const newMovie = new MovieModel(req.body);
        await newMovie.save();
        res.status(200).send(newMovie);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
});

router.patch("/movie/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const payload = req.body;
        const movie = await MovieModel.findByIdAndUpdate(id, payload, { new: true });
        if (!movie) {
            return res.status(404).send("Movie not found");
        }
        res.status(200).send(movie);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
});

router.delete("/movie/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const movie = await MovieModel.findByIdAndDelete(id);
        if (!movie) {
            return res.status(404).send("Movie not found");
        }
        res.status(200).send(movie);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
});

module.exports = router;
