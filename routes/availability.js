
const express = require('express');
const router = express.Router();
const db = require('../database');

router.post('/', (req, res) => {
  const { professor_id, time_slot } = req.body;
  db.run("INSERT INTO availability (professor_id, time_slot) VALUES (?, ?)", [professor_id, time_slot], function(err) { 

    if (err) return res.status(500).send(err.message);
    res.status(201).send({ id: this.lastID });
  });
});

router.get('/:professor_id', (req, res) => { 

  const { professor_id } =req.params;
  db.all("SELECT * FROM availability WHERE professor_id = ? ", [professor_id], (err, rows) => {
    if (err) return res.status(500).send(err.message);
      res.status(200).send(rows);
  });
});

module.exports = router;
