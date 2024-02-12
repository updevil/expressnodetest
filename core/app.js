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

const Data = mongoose.model('users', {
    name: String,
    age: Number
});

const publicPath = path.join(__dirname,'../public');
// กำหนดเส้นทางของไดเรกทอรี views
const viewsPath = path.join(__dirname, '../template/views');
// กำหนดเส้นทางของไดเรกทอรี partials
const partialsPath = path.join(__dirname, '../template/partials');
// กำหนดเส้นทางให้ Express รู้จัก views และ partials
app.use(express.static(publicPath))
app.set('views', viewsPath);
app.set('view engine', 'hbs');
hbs.registerPartials(partialsPath);

// app.get('', (req, res) => {
//     res.render('index', {
//         title: 'index'
//     })
// })
app.get('', (req, res) => {
    const name = req.query.search;
    Data.find({ name: name }).then((data) => {
        res.render('index', {
            title: 'index',
            searchData: data
        });
    }).catch((error) => {
        console.error('Error searching data:', error);
        res.send('An error occurred while searching data');
    });
});


app.listen(8080, () => {
    console.log('Server up');
})

