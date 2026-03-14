const app = require("./app");

const PORT = process.env.MYSQLPORT || 40898;

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
