const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { dbURI } = require('./config');
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const expressLayouts = require('express-ejs-layouts');

const usersRouter = require('./Routes/users.routes');
const filesRouter = require('./Routes/files.routes');
const viewsRouter = require('./Routes/views.routes');

const app = express();
app.use('/', express.static(path.join(__dirname, 'static')));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(fileUpload());
app.use(expressLayouts);
app.set('view engine', 'ejs');

mongoose
	.connect(dbURI, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log("Database Connected"))
	.catch((err) => console.log(err));

mongoose.Promise = global.Promise;

app.use('/users', usersRouter);
app.use('/files', filesRouter)
app.use('/', viewsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.status(err.status || 404).json({
    message: "No such route exists"
  })
});

// error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500).json({
    message: "Error Message"
  })
});


app.listen(9999, () => {
	console.log('Server up at 9999')
})
