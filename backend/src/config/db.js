// backend/db.js
require("dotenv").config({ path: "../.env" });
const mysql = require("mysql2");
const pino = require("pino");
const path = require("node:path");
const fs = require("fs");
const { app } = require("electron"); // needed for packaged app paths

// Determine log directory for production (user-writable)
const logDir =
	process.env.NODE_ENV === "production"
		? path.join(app.getPath("userData"), "logs") // safe location in packaged app
		: path.join(__dirname, "..", "logs"); // dev logs

if (!fs.existsSync(logDir)) {
	fs.mkdirSync(logDir, { recursive: true });
}

// Pino logger
const logger =
	process.env.NODE_ENV === "production"
		? pino(pino.destination(path.join(logDir, "app.log"))) // production → file
		: pino({ level: "debug", sync: true }); // development → console

// MySQL connection
const db = mysql.createConnection({
	// host: process.env.MYSQLHOST,
	// user: process.env.MYSQLUSER,
	// password: process.env.MYSQLPASSWORD,
	// database: process.env.MYSQLDATABASE,
	// port: process.env.MYSQLPORT,
	host: "ballast.proxy.rlwy.net",
	user: "root",
	password: "qkfSLfOeJeFkfscCPJlQmxsZrBGWKzCs",
	database: "railway",
	port: 40898,
	// host: process.env.MYSQLHOST || "localhost",
	// user: process.env.MYSQLUSER || "root",
	// password: process.env.MYSQLPASSWORD || "root1234",
	// database: process.env.MYSQLDATABASE || "video_app",
	// port: process.env.MYSQLPORT || 3306,
});

// Promise-based startup check
function startDatabase() {
	return new Promise((resolve, reject) => {
		db.connect((err) => {
			if (err) {
				logger.error({ err }, "Database connection failed");
				reject(err);
			} else {
				logger.info("Connected to MySQL");
				resolve();
			}
		});
	});
}

module.exports = { db, startDatabase, logger };
