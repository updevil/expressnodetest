const express = require('express');
const hbs = require('hbs');
const app = express()
const path = require('path');  
const mongoose = require('mongoose');

// เชื่อมต่อกับ MongoDB
mongoose.connect('mongodb://localhost:27017', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});


const publicPath = path.join(__dirname,'../public');
const viewsPath = path.join(__dirname, '../template/views');
const partialsPath = path.join(__dirname, '../template/partials');
app.use(express.static(publicPath))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('views', viewsPath);
app.set('view engine', 'hbs');
hbs.registerPartials(partialsPath);



const searchApp = require('./search.app');
const insertApp = require('./insert.app');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(searchApp);
app.use(insertApp);





app.listen(8080, () => {
    console.log('Server up');
})

