const express = require("express");
const cors = require("cors");
const db = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const videoRoutes = require("./routes/videoRoutes");
const healthRoutes = require("./routes/healthRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
	res.send("API running");
});

app.get("/test-db", (req, res) => {
	db.query("SELECT 1", (err, result) => {
		if (err) {
			res.status(500).json({ error: err });
			return;
		}
		res.json({ success: true, result });
	});
});

app.use("/api", healthRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/video", videoRoutes);

module.exports = app;
