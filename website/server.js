const express = require("express");
const oracledb = require("oracledb");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, "public")));

const dbConfig = {
  user: "counter_app",
  password: "CounterPass123",
  connectString: "oracle-db:1521/FREEPDB1"
};

app.get("/api/count", async (req, res) => {
  let connection;

  try {
    connection = await oracledb.getConnection(dbConfig);
    const result = await connection.execute(
      "SELECT count FROM counter"
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Counter row not found" });
    }

    res.json({ count: result.rows[0][0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not read counter" });
  } finally {
    if (connection) await connection.close();
  }
});

app.post("/api/increment", async (req, res) => {
  let connection;

  try {
    connection = await oracledb.getConnection(dbConfig);

    await connection.execute(
      "UPDATE counter SET count = count + 1"
    );

    await connection.commit();

    const result = await connection.execute(
      "SELECT count FROM counter"
    );

    res.json({ count: result.rows[0][0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not update counter" });
  } finally {
    if (connection) await connection.close();
  }
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Website listening on port ${PORT}`);
});