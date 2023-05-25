import {} from "dotenv/config";
import express from 'express';
import userRouter from "./routes/user-routes";
import blogRouter from "./routes/blog-routes";
import { connectDB } from "./config/dbConnection";

//Database connection
connectDB();

const app = express();
app.use(express.json());
app.use("/api/users",userRouter);
app.use("/api/blogs", blogRouter);

//setting up the port
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


