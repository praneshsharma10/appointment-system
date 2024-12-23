
const express = require('express');
const router = express.Router();
const db = require('../database');

router.post('/', (req, res) => {
  const { student_id, professor_id, time_slot } = req.body;
  db.run("INSERT INTO appointments (student_id, professor_id, time_slot) VALUES (?, ?, ?)", [student_id, professor_id, time_slot], function(err) {
    if (err) return res.status(500).send(err.message);
    res.status(201).send({ id: this.lastID });
  });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.run("DELETE FROM appointments WHERE id = ?", [id], function(err) {
    if (err) return res.status(500).send(err.message);
    res.status(200).send({ deleted: this.changes });
  });
});

router.get('/student/:student_id', (req, res) => {
  const { student_id } = req.params;
  db.all("SELECT * FROM appointments WHERE student_id = ?", [student_id], (err, rows) => {
    if (err) return res.status(500).send(err.message);
    res.status(200).send(rows);
  });
});

module.exports = router;
