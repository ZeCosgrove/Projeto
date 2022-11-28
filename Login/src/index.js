const express = require('express');
const path = require('path')
const bodyParser = require('body-parser')

// Constants
const PORT = 8081;
const HOST = '0.0.0.0';

// App
const app = express();
app.use('/', express.static(path.join(__dirname,'static')))
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

// Rotas
app.use("/", require('./route/auth'))
app.use("/user", require('./route/user'))

//Server
app.listen(PORT, HOST, () => {
  console.log(`Running on http://${HOST}:${PORT}`);
});