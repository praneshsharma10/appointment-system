
const express = require('express');
const router = express.Router();
const db = require('../database');

router.post('/login', (req, res) => {
  const { name, role } = req.body;
  db.run("INSERT INTO users (name, role) VALUES (?, ?)", [name, role], function(err) {
    if (err) return res.status(500).send(err.message);
    res.status(201).send({ id: this.lastID });
  });
});

module.exports = router;
