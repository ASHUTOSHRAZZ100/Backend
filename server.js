import { app } from "./app.js";
import connectToDB from "./data/db.js";

connectToDB();

const PORT = process.env.PORT;
app.listen(PORT, (err) => {
  if (err) {
    console.error("Error starting server:", err.message);
    process.exit(1);
  }
  console.log(`😀 server is working on port http://localhost:${process.env.PORT} in ${process.env.NODE_ENV}`);
});
