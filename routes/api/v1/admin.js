const express = require("express");

const router = express.Router();

router.get("/admin", (req, res) => res.json({ msg: "Hello Admin" }));

router.get("/flagged", (req, res) => res.json({ msg: "get flagged" }));

module.exports = router;
