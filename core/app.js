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
// กำหนดเส้นทางของไดเรกทอรี views
const viewsPath = path.join(__dirname, '../template/views');
// กำหนดเส้นทางของไดเรกทอรี partials
const partialsPath = path.join(__dirname, '../template/partials');
// กำหนดเส้นทางให้ Express รู้จัก views และ partials
app.use(express.static(publicPath))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('views', viewsPath);
app.set('view engine', 'hbs');
hbs.registerPartials(partialsPath);



const Data = mongoose.model('users', {
    email: String,
    age: Number,
    name:String,
    username: String
});
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




app.get('/insert',(req,res)=>{
    res.render('insert', {
        title: 'Insert Form'
    });
});


// เส้นทางสำหรับจัดการข้อมูลที่ส่งมาจากฟอร์ม
app.post('/submit_form', (req, res) => {
    // ดึงข้อมูลจากฟอร์ม
    const { email, age, name, username } = req.body;

    // สร้างข้อมูลใหม่ในโมเดล InsertData
    const newData = new Data({
        email: email,
        age: age,
        name:name,
        username: username
    });

    // บันทึกข้อมูลใหม่ลงใน MongoDB
    newData.save()
        .then(() => {
            res.send('Data inserted successfully!');
        })
        .catch(error => {
            console.error('Error inserting data:', error);
            res.send('An error occurred while inserting data');
        });
});




app.listen(8080, () => {
    console.log('Server up');
})

