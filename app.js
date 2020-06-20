const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const passport = require('passport');
const logger = require('morgan');
const keys = require('./config/keys');
require('./models/User');
require('./services/passport');

// DB
let DB_URL;
if (process.env.NODE_ENV === "development") {
	DB_URL = process.env.DB_CLOUD;
} else {
	DB_URL = process.env.DB_CLOUD;
}
mongoose.connect(keys.mongoURI, {
	useNewUrlParser: true,
	useCreateIndex: true,
	useFindAndModify: false,
	useUnifiedTopology: true
})
	.then(() => console.log("DB Connected"));

let app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

app.use(
	cookieSession({
		maxAge: 30 * 24 * 60 * 60 * 1000,
		keys: [keys.cookieKey]
	})
);
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);

module.exports = app;
