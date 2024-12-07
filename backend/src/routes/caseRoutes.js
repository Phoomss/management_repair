const caseRouter = require('express').Router()
const caseController = require('../controllers/caseController');
const upload = require('../config/multerConfig');  // นำเข้า upload จาก multerConfig

// ใช้ multer ในการอัปโหลดไฟล์
caseRouter.post('/', upload.array('images', 5), caseController.createCase);

caseRouter.get('/', caseController.listCase)
caseRouter.get('/:id', caseController.getCaseById)

caseRouter.put('/:id', upload.array('images', 5), caseController.updateCase)

caseRouter.delete('/:id', caseController.deleteCase)

module.exports = caseRouter;
