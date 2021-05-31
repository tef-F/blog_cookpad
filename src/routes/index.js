const newsRouter = require('./news');
const siteRouter = require('./site');
const foodRouter = require('./food');
const userRouter = require('./user');
const stepRouter = require('./step');
const likeRouter = require('./like');
const commentRouter = require('./comment');

function router(app) {
    app.use('/me', userRouter);

    app.use('/news', newsRouter);

    app.use('/food', foodRouter);

    app.use('/step', stepRouter);

    app.use('/like', likeRouter);

    app.use('/comment', commentRouter);

    app.use('/', siteRouter);
}

module.exports = router;
