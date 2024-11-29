const express = require('express');
const authRouter = require('./authRoutes');
const userRouter = require('./userRoutes');
const pipeRouter = require('./pipeRoutes');

const rootRouter = express.Router();

rootRouter.use('/auth', authRouter);
rootRouter.use('/user', userRouter)
rootRouter.use('/pipe', pipeRouter)

module.exports = rootRouter;
