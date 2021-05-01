const app = require(`${__dirname}/app.js`);
const dotenv = require("dotenv");
const db = require(`${__dirname}/models/db`);

dotenv.config();

//Look port on env var or 3000 as default.

const port = process.env.PORT || 3000;

app.listen(port, async (req, res) => {
  //Test db connection
  try {
    await db.authenticate();
    console.log("Database server connected");
    await db.sync();
    console.log("All models were synchronized");
  } catch (err) {
    console.log("Error with the DB connection");
    console.log(err);
  }
  //
  console.log(`Server running on port ${port}`);
});
