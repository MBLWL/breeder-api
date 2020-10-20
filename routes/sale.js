const express = require('express');
const router = express.Router();
const SaleControoler = require('../controller/sales.controller');
const { auth, allowAdmin, allowBreeder, allowEmployee, authenticateRole } = require("../middleware/auth");

router.get('/breederSaleList', auth, allowBreeder, allowEmployee, authenticateRole, SaleControoler.getAllBreederSaleList)

router.post('/saleAnimal', auth, allowAdmin, allowBreeder, allowEmployee, authenticateRole, SaleControoler.saleAnimal);
router.get('/', auth, allowAdmin, allowBreeder, allowEmployee, authenticateRole, SaleControoler.getSales);
router.get('/:id', auth, allowAdmin, allowBreeder, allowEmployee, authenticateRole, SaleControoler.getSaleDetail);
router.put('/changePaidStatus/:id', auth, allowAdmin, allowBreeder, allowEmployee, authenticateRole, SaleControoler.changePaidStatus);

module.exports = router;