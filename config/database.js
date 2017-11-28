let databaseURL = 'mongodb://localhost:27017/meanauth';

if (process.env.DATABASE_URI) {
  databaseURL = process.env.DATABASE_URI;
}

module.exports = {
  database: databaseURL,
  secret: 'secret'
}
