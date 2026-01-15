import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());


import { router } from "./routes/index.js";

app.use("/api/v1",router);

app.listen(3000, () => {
    console.log("Server is running on port 3000");
})
