const express = require('express');
const router = express.Router();
const { auth, allowBreeder, authenticateRole } = require("../middleware/auth");
//const { adminauth } = require("../middleware/adminauth");
const ProductController = require('../controller/product.controller');
const {upload} = require('../middleware/multerimage');

router.route('/')
  .post(auth, allowBreeder, authenticateRole , upload.array('file'), ProductController.create)
  .delete(auth,ProductController.deleteallbreeder)
  .get(auth,ProductController.getallbreeder)


//for see/delete/update product by id
router.route('/:id').get(auth,ProductController.getbyId)
  .delete(auth,ProductController.deletebyId)
.patch(auth,ProductController.updatebyId)

module.exports=router