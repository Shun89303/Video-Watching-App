const mysql = require("mysql2");
require("dotenv").config();

function getEnvVar(name) {
	const value = process.env[name];
	if (!value) {
		throw new Error(`Environment variable ${name} is not defined`);
	}
	return value;
}

const db = mysql.createConnection({
	host: getEnvVar("MYSQLHOST"),
	user: getEnvVar("MYSQLUSER"),
	password: getEnvVar("MYSQLPASSWORD"),
	database: getEnvVar("MYSQLDATABASE"),
	port: parseInt(getEnvVar("MYSQLPORT"), 10),
});

module.exports = db;
