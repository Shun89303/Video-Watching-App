const db = require("../config/db");

exports.searchVideo = (req, res) => {
	const { search } = req.body;

	const query = "SELECT local_path FROM videos WHERE metadata_key = ?";

	db.query(query, [search.toLowerCase()], (err, result) => {
		if (err)
			return res.status(500).json({ success: false, error: err.message });

		if (result.length === 0) {
			return res.json({ success: false, message: "Video not found" });
		}

		res.json({
			success: true,
			url: result[0].local_path,
		});
	});
};

exports.markWatched = (req, res) => {
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
};
