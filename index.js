const express = require("express");

const router = require("./router");

const app = express();
app.use(express.json());

app.use("/api", router);

app.listen(4000, () => {console.log("App listen on http://localhost:4000")});