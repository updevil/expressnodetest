const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');


const Data = mongoose.model('users');


router.get('/insert',(req,res)=>{
    res.render('insert', {
        title: 'Insert Form'
    });
});

router.post('/submit_form', (req, res) => {
    const { email, age, name, username } = req.body;

    const newData = new Data({
        email: email,
        age: age,
        name: name,
        username: username
    });

    newData.save()
        .then(() => {
            res.send('Data inserted successfully!');
        })
        .catch(error => {
            console.error('Error inserting data:', error);
            res.send('An error occurred while inserting data');
        });
});

module.exports = router;
