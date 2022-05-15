import express from "express";
import { db } from "./src/index.js";
import userRoutes from "./src/routes/user.js";
import homePageRoutes from "./src/routes/homepage.js";
import adminRoutes from "./src/routes/admin.js";
import bodyParser from "body-parser";

const app = express();

db.authenticate()
  .then(() => console.log("Db connected"))
  .catch((err) => console.log(err));


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/user', userRoutes);
app.use('/homepage', homePageRoutes);
app.use('/admin', adminRoutes);

app.listen(process.env.PORT || 8080);
