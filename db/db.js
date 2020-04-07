const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);

(async () => {
  try {
    await mongoose.connect(process.env.DB_URL, {useNewUrlParser: true, useUnifiedTopology: true});
    console.log
('DB CONNECTED');
  } catch (err) {
    console.error('NO CONNECTION', err);
  }
})();

module.exports = mongoose.connection;

