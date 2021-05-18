const newsRouter = require('./news');
const siteRouter = require('./site');
const foodRouter = require('./food');
const userRouter = require('./user');

function router(app) {
    app.use('/me', userRouter);

    app.use('/news', newsRouter);

    app.use('/food', foodRouter);

    app.use('/', siteRouter);
}

module.exports = router;
