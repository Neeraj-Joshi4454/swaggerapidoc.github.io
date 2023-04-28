// mongodbpassword : NXiBNpbyNyR86X4p

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const router = require('./routes/book-routes');
const cors = require('cors');

const swaggerUI = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerJsDocs = YAML.load('./api.yaml')


// middlewares
app.use(express.json())
app.use(cors());
app.use("/books", router)
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerJsDocs))
// connection to database

mongoose.connect('mongodb+srv://neerajmjoshi1:NXiBNpbyNyR86X4p@cluster0.sw1n4ec.mongodb.net/bookdatabase?retryWrites=true&w=majority')
.then(() => {

    console.log('connection succesfull')

})
.then(() => {

    app.listen(5000)

})
.catch((e) => {

    console.log(e)
})