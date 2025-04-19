const app = require("./app");
const http = require("http");
const dotenv = require("dotenv");
const connectDatabase = require("./config/database");

dotenv.config({ path: "./config/config.env" });

connectDatabase();

const server = http.createServer(app);

server.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT || 5000}`);
});

process.on("uncaughtException", (err) => {
  console.error(`Uncaught Exception: ${err.message}`);
  console.error("Shutting down the server due to Uncaught Exception");

  server.close(() => {
    process.exit(1); 
  });
});

process.on("unhandledRejection", (err) => {
  console.error(`Unhandled Rejection: ${err.message}`);
  console.error("Shutting down the server due to Unhandled Promise Rejection");


  server.close(() => {
    process.exit(1); 
  });
});
