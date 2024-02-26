const { default: mongoose, Error } = require("mongoose");

const dbconnect = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    if (conn.connection.readyState === 1)
      console.log("Connection successfully");
    else console.log("Connection failed");
  } catch (error) {
    console.log("Connect failed");
    throw new Error(error);
  }
};

module.exports = dbconnect;
