const mongoose = require('mongoose');
mongoose.set( 'useFindAndModify', false );


mongoose.set('useNewUrlParser', true);

mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

module.exports = {
    MONGO_URI: "mongodb://localhost:27017/react-redux-websockets-passport",  
    JWT_SECRET: "jwt-react-redux-websockets-passport",
    JWT_TOKEN_EXPIRATION: 3600,
    SESSION_SECRET: "session-react-redux-websockets-passport",
    SESSION_EXPIRATION: 30 * 24 * 60 * 60 * 1000,
    PORT: 3000,
 
};
