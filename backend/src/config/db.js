const mysql = require("mysql2");
require("dotenv").config();

const db = mysql.createConnection({
	// host: "localhost",
	// user: "root",
	// password: "root1234",
	// database: "video_app",
	// port: 3306,
	host: process.env.MYSQLHOST || "localhost",
	user: process.env.MYSQLUSER || "root",
	password: process.env.MYSQLPASSWORD || "root1234",
	database: process.env.MYSQLDATABASE || "video_app",
	port: process.env.MYSQLPORT || 3306,
});

module.exports = db;
