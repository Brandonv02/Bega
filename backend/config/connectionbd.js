const mongoose = require("mongoose");
require("dotenv").config();

const uri = `mongodb+srv://${process.env.USERNAMEBD}:${process.env.PASSWORDBD}@clusteradso2498009.nnizzya.mongodb.net/${process.env.BDNAME}`;

mongoose.connect(uri, {useNewUrlParser: true});

module.exports = mongoose;
