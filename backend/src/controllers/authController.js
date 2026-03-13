const db = require("../config/db");
const bcrypt = require("bcrypt");

exports.login = (req, res) => {
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
};
