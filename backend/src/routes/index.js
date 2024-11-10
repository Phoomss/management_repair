const express = require('express'); 
const authRouter = require('./authRoutes'); 
const userRouter = require('./userRoutes');

const rootRouter = express.Router(); 

rootRouter.use('/auth', authRouter);
rootRouter.use('/user',userRouter)

module.exports = rootRouter;
