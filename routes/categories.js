const express = require('express');
const router = express.Router();
const { adminauth } = require("../middleware/adminauth");
const { auth } = require("../middleware/auth");
const CategoryController = require('../controller/category.controller');

//create,delete category only by admin
router.post("/",adminauth,CategoryController.create)

router.route('/all').delete(adminauth,CategoryController.deleteall)
  .get(auth,CategoryController.getall)


//for see/delete/update category by id
router.route('/:id').get(auth,CategoryController.getbyId)
  .delete(auth,CategoryController.deletebyId)
.patch(auth,CategoryController.updatebyId)

module.exports=router