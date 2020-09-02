const express = require('express');
const router = express.Router();
const { adminauth } = require('../middleware/adminauth');
const { auth, allowBreeder, authenticateRole, allowEmployee, allowAdmin } = require('../middleware/auth');
const FormController = require('../controller/form.controller');


router.get('/all/forms', auth, allowBreeder, allowAdmin, authenticateRole, FormController.getForms);


router.get('/:categoryId', FormController.getFormByCategory)
.get('/', auth, allowBreeder, authenticateRole, FormController.getAllForms)
    .post('/', adminauth, FormController.addForm)
    .put('/:id', auth, FormController.modifyForm)
    .delete('/category/:id', FormController.deleteFormByCategory);



router.put('/modify/values', auth, allowBreeder, authenticateRole, FormController.modifyValuesRequest);

module.exports = router;
