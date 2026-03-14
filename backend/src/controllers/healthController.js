const db = require("../config/db");

exports.checkDB = async (req, res) => {
	db.ping((err) => {
		if (err) {
			res
				.status(500)
				.json({ status: "error", message: "Database connection failed" });
		} else {
			res.json({ status: "ok", message: "Database connected" });
		}
	});
};
