const express = require("express");
const cors = require("cors");
require("dotenv").config();
const router = require("../src/routes");

const app = express();
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
); // cho phép client chỉ có thể truy cập đến server qua 4 PT get,post,put,delete <=> CURD

app.use(express.json()); // server sẽ đọc được data json mà client gửi lên
app.use(express.urlencoded({ extended: true })); // server sẽ đọc được data dạng mảng và object và convert về json mà client gửi lên

// app.use("/", (req, res) => {
//   return res.send("SERVER ON");
// });
router(app);

const PORT = process.env.PORT || 8888;

const listener = app.listen(PORT, () => {
  console.log("Server is running on the port " + listener.address().port);
});
