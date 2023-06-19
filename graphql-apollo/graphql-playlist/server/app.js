const express = require('express');
const cors = require("cors");
const { graphqlHTTP } = require('express-graphql');

const schema = require('./schema/schema');
const mongoose = require('mongoose');

const app = express();

//DB credentials
//username :- root
//password :- G3pnGSVd8gy5Mve7
//connect database if you are getting error in db connection 
//change db uri from online page and select node 2.2.12 or later from drop down


mongoose.connect('mongodb://root:G3pnGSVd8gy5Mve7@ac-uhd9cjg-shard-00-00.lkc6yj3.mongodb.net:27017,ac-uhd9cjg-shard-00-01.lkc6yj3.mongodb.net:27017,ac-uhd9cjg-shard-00-02.lkc6yj3.mongodb.net:27017/?ssl=true&replicaSet=atlas-dx6nd8-shard-0&authSource=admin&retryWrites=true&w=majority');
mongoose.connection.once('open', () => {
    console.log("Connected to database.");
});

const corsOptions ={
    origin:'*', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
 };

 app.use(cors(corsOptions));

app.use('/graphql',graphqlHTTP({
    schema,
    graphiql:true
}))

app.listen(4000,() => {
    console.log('Listing for requests on port 4000');
});