const app = require("./app");
require("dotenv").config({ path: "../.env" });

const PORT = process.env.MYSQLPORT || 3000;

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
