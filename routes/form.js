const express = require('express');
const router = express.Router();
const FormController = require('../controller/form.controller');
const { adminauth } = require('../middleware/adminauth');
const { auth } = require('../middleware/auth');
const formController = require('../controller/form.controller');

router.get('/:categoryId', FormController.getFormByCategory)
.get('/', FormController.getAllForms)
    .post('/', adminauth, FormController.addForm)
    .put('/:id', auth, FormController.modifyForm)
    .delete('/category/:id', FormController.deleteFormByCategory);



router.put('/modify/values', FormController.modifyValues);

module.exports = router;
