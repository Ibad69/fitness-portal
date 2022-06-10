import express from "express";
import { db } from "./src/index.js";
import userRoutes from "./src/routes/user.js";
//import homePageRoutes from "./src/routes/homepage.js";
import adminRoutes from "./src/routes/admin.js";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
app.use(cors());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, timeZone, x-token");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, PATCH");
    next();
});

db.authenticate()
  .then(() => console.log("Db connected"))
  .catch((err) => console.log(err));


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/user', userRoutes);
// app.use('/homepage', homePageRoutes);
app.use('/admin', adminRoutes);

app.listen(process.env.PORT || 8080);
