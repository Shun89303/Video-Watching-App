// backend/db.js
require("dotenv").config({ path: "../.env" });
const mysql = require("mysql2");

// MySQL connection
const db = mysql.createConnection({
	// host: process.env.MYSQLHOST,
	// user: process.env.MYSQLUSER,
	// password: process.env.MYSQLPASSWORD,
	// database: process.env.MYSQLDATABASE,
	// port: process.env.MYSQLPORT,
	// host: "ballast.proxy.rlwy.net",
	// user: "root",
	// password: "qkfSLfOeJeFkfscCPJlQmxsZrBGWKzCs",
	// database: "railway",
	// port: 40898,
	host: process.env.MYSQLHOST || "localhost",
	user: process.env.MYSQLUSER || "root",
	password: process.env.MYSQLPASSWORD || "root1234",
	database: process.env.MYSQLDATABASE || "video_app",
	port: process.env.MYSQLPORT || 3306,
});

module.exports = { db };
