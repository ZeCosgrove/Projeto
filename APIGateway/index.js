
const express = require('express')
var httpProxy = require('express-http-proxy');


const app = express()
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

const port = 8080


app.get('/', (req, res) => {
  res.status(200).send("Projeto UC AIS - 18809 e 18826")
});

app.use('/user', (req, res, next) => {
  httpProxy(`http://${process.env.LOGS_URI}:8081/`)(req, res, next);
});

app.use('/produto', (req, res, next) => {
  httpProxy(`http://${process.env.LOGS_URI}:8083/`)(req, res, next);
});

app.use('/ajuda', (req, res, next) => {
    httpProxy(`http://${process.env.LOGS_URI}:8084/`)(req, res, next);
});

app.use('/modelacao', (req, res, next) => {
    httpProxy(`http://${process.env.LOGS_URI}:8085/`)(req, res, next);
});

app.use('/compra', (req, res, next) => {
    httpProxy(`http://${process.env.LOGS_URI}:8086/`)(req, res, next);
});

app.use('/promocao', (req, res, next) => {
    httpProxy(`http://${process.env.LOGS_URI}:8087/`)(req, res, next);
});


app.listen(port, () => {
  console.log(`APIGateway running on port ${port}`)
})