const express = require('express'); 
const authRouter = require('./authRoutes'); 

const rootRouter = express.Router(); 

rootRouter.use('/auth', authRouter);

module.exports = rootRouter;
