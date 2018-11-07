const express = require('express');
const mongoose = require ('mongoose');

const app = express();

mongoose.connect(
    'mongodb://goweek:goweek123@ds155293.mlab.com:55293/goweek-wesley',
    {
        useNewUrlParser: true
    }
);

app.use(express.json());
app.use(require('./routes'));

app.listen(3000, () => {
    console.log("Server started on port 3000");
});