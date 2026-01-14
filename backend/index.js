const express = require("express");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const app = express();

import { router } from "./routes";

app.use("/api/v1",router);

app.listen(3000, () => {
    console.log("Server is running on port 3000");
})
