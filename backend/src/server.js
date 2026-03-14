const app = require("./app");

const PORT = process.env.MYSQLPORT || 3000;
// const PORT = 3000;

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
