const mysql = require("mysql2");
require("dotenv").config();

const db = mysql.createConnection({
	host: process.env.MYSQLHOST || "localhost",
	user: process.env.MYSQLUSER || "root",
	password: process.env.MYSQLPASSWORD || "root1234",
	database: process.env.MYSQLDATABASE || "video_app",
	port: process.env.MYSQLPORT || 3306,
});

module.exports = db;
