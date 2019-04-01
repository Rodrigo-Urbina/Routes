const express = require('express');
const bodyParser = require('body-parser');
const postRouter = require('./router');
const app = express();
const jsonParser = bodyParser.json();

app.use('/', jsonParser, postRouter);

app.listen(8080, () => {
	console.log('Your app is running in port 8080');
});