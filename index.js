import express from 'express';
import router from './routes/index.js';
import db from './config/db.js';

const app = express();

// Connect to database
db.authenticate()
    .then(() => console.log("Database connected"))
    .catch(error => console.log(error))

// Set port
const port = process.env.PORT || 4000;

//Enable Pug
app.set('view engine', 'pug');

// Get currente year
app.use((req, res, next) => {
    const year = new Date();
    res.locals.currentYear = year.getFullYear();
    res.locals.siteName = "Travel Agency";
    
    return next();
});

// Add body-parser to read form data
app.use(express.urlencoded({extended: true}));

// Set public folder
app.use(express.static('public'));

//Add router
app.use('/', router);

app.listen(port, () => {
    console.log(`Server working on port ${port}`);
});