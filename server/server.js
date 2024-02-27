const express = require("express");
const cors = require("cors");
const routes = require("./routes");
const dbconnect = require("./config/dbconnect");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 8888;

app.use(express.json()); // server sẽ đọc được data json mà client gửi lên
app.use(express.urlencoded({ extended: true })); // server sẽ đọc được data dạng mảng và object và convert về json mà client gửi lên
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
); // cho phép client chỉ có thể truy cập đến server qua 4 PT get,post,put,delete <=> CURD

dbconnect();
routes(app); //dùng để middleware các routes

app.listen(port, () => {
  console.log("Server is running on the port:  " + port);
});

// app.use("/", (req, res) => {
//   return res.send("SERVER ON");
// });
