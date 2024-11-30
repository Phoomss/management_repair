const caseRouter =require('express').Router()
const caseController = require('../controllers/caseController')
const formidable = require('express-formidable');

caseRouter.post('/',formidable(),caseController.createCase)

module.exports = caseRouter