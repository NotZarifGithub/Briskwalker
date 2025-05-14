require('dotenv').config();
const express = require('express');

const app = express();
const PORT = process.env.SERVER_PORT;

app.get('/', (req, res) => (
  console.log('TESTING')
))

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
})

module.exports = app