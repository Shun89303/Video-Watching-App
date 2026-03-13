const express = require("express");
const router = express.Router();
const videoController = require("../controllers/videoController");

router.post("/search-video", videoController.searchVideo);
router.post("/mark-watched", videoController.markWatched);

module.exports = router;
