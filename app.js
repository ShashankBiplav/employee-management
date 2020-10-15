
const express = require('express');

const path = require('path');

const bodyParser = require('body-parser');

const mongoose = require('mongoose');

const multer = require('multer');

require('dotenv').config();

const port = process.env.PORT|| 3001;

const app = express();

const authRoutes = require('./routes/auth');

//filestorage setup
const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images');
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString() + '-' + file.originalname);
    }
});

//accepting only images for now
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

app.use(bodyParser.json());

app.use(multer({
    storage: fileStorage,
    fileFilter: fileFilter
}).single('image'));

app.use('/images', express.static(path.join(__dirname, 'images')));

//middleware to avoid CORS errors
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});
//auth route entry point
app.use('/auth', authRoutes);

//central error handling middleware
app.use((error, req, res, next) => {
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({
        message: message,
        data: data
    });
});

//start server only on successful connection to Database
mongoose.connect(process.env.MONGODB_URI,{
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false
})
    .then(()=>{
        console.log('Connection to DB successful \n');
        console.log('Starting server => ;D');
        app.listen(port,
            ()=>{
                console.log(`listening on port => ${port}`);
            }
        );
    }).catch(err=>{
    console.log(err);
});
