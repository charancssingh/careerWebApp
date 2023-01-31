const mongoose = require('mongoose');

const connectionString = "mongodb+srv://Charan_singh:Charan%401@cluster0.m3brg5l.mongodb.net/user?retryWrites=true&w=majority"; 
// const connectionString1 = "mongodb+srv://root:root@cluster0.jfqfm.mongodb.net/?retryWrites=true&w=majority";
module.exports = () => {
    mongoose.set("strictQuery", true);
    mongoose.connect(connectionString, {useUnifiedTopology: true, useNewUrlParser: true})
    .then(`Connected to mongoDb : ${connectionString}`)
    .catch(error => console.log(`Error occurred while connecting mongoDb database : ${connectionString}, Error : ${error}`));
};