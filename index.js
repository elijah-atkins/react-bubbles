require("dotenv").config();
const server = require("./server.js");

const PORT = process.env.PORT;

!PORT || PORT === undefined
  ? console.log("ERROR: Cannot find port")
  : server.listen(PORT, () => {
      console.log(`\n*** Server Running on http://localhost:${PORT} ***\n`);
    });
