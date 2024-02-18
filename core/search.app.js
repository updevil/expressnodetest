const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Data = mongoose.model('users', {
    email: String,
    age: Number,
    name: String,
    username: String
});

router.get('', (req, res) => {
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

module.exports = router;
