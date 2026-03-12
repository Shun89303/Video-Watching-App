const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bcrypt = require("bcrypt");

const app = express();

app.use(cors());
app.use(express.json());

// Connect to MySQL
const db = mysql.createPool({
	host: process.env.MYSQLHOST || "localhost",
	user: process.env.MYSQLUSER || "root",
	password: process.env.MYSQLPASSWORD || "root1234",
	database: process.env.MYSQLDATABASE || "video_app",
	port: process.env.MYSQLPORT || 3306,
});

db.connect((err) => {
	if (err) console.log("Database connection failed:", err);
	else console.log("Connected to MySQL");
});

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

// Login endpoint
app.post("/login", (req, res) => {
	const { phone, password } = req.body;
	const query = "SELECT * FROM users WHERE phone = ?";

	db.query(query, [phone], async (err, result) => {
		if (err) return res.status(500).json({ success: false });
		if (result.length === 0) return res.json({ success: false });

		const user = result[0];
		const match = await bcrypt.compare(password, user.password);

		if (match) res.json({ success: true });
		else res.json({ success: false });
	});
});

// Search video endpoint
app.post("/search-video", (req, res) => {
	const { search } = req.body; // the keyword entered in search bar

	// Query MySQL for the video
	const query = "SELECT local_path FROM videos WHERE metadata_key = ?";
	db.query(query, [search.toLowerCase()], (err, result) => {
		if (err)
			return res.status(500).json({ success: false, error: err.message });

		if (result.length === 0) {
			// No video found
			return res.json({ success: false, message: "Video not found" });
		}

		// Video found, return the local path
		const videoPath = result[0].local_path;
		res.json({ success: true, url: videoPath });
	});
});

app.post("/mark-watched", (req, res) => {
	const { phone, metadata_key } = req.body;

	const query = `
    INSERT INTO watched_videos (user_phone, video_metadata_key)
    VALUES (?, ?)
    ON DUPLICATE KEY UPDATE watched_at = CURRENT_TIMESTAMP
  `;

	db.query(query, [phone, metadata_key], (err) => {
		if (err)
			return res.status(500).json({ success: false, error: err.message });
		res.json({ success: true });
	});
});

// Start server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
