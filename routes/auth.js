const express = require("express");
const router = express.Router();

// POST /auth
router.post("/", (req, res) => {
    if (req.fields.username === "admin" && req.fields.password === "pass") {
        res.json({ success: true });
    } else {
        res.json({ success: false });
    }
});

module.exports = router;