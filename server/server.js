require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// Import db connection
const db = require('./models/index');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
// app.use('/api', routes);

// Default route
app.get('/', (req, res) => (
  res.send('Briswalker API is running')
))

const PORT = process.env.PORT;

// Db connection on server startup
db.sequelize.authenticate()
  .then(() => {
    console.log('Databse connection established successfully')

    // Sync models with db (in development)
    // In production, use migration instead
    if (process.env.NODE_ENV !== 'production') {
      return db.sequelize.sync();
    }
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    })
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  })

module.exports = app