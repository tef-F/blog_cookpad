const express = require('express');
const morgan = require('morgan');
const expHandleBars = require('express-handlebars');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
// APP
const app = express();
const port = 3000;
const route = require('./routes');
const db = require('./config/db');
const methodOverride = require('method-override');

//Session
app.use(session({ secret: 'ssshhhhh', saveUninitialized: true, resave: true }));
// MethodOverride
app.use(methodOverride('_method'));
//CookieParser
app.use(cookieParser());
//Body parser
//Using public patch
app.use(express.static(path.join(__dirname, 'public')));
app.use(
    express.urlencoded({
        extended: true,
    }),
);

// HTTP logger
app.use(morgan('combined'));
//Template engine
app.engine(
    'hbs',
    expHandleBars({
        extname: '.hbs',
        // helpers: {
        //     sum: (a, b) => a + b,
        // },
    }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));
// console.log(__dirname);

// Import route init
route(app);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
