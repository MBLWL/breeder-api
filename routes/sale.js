const express = require('express');
const router = express.Router();
const SaleControoler = require('../controller/sales.controller');
const { auth, allowAdmin, allowBreeder, allowEmployee, authenticateRole } = require("../middleware/auth");
const { autoCharge } = require("../middleware/autoCharge");

router.get('/breederListSimple', auth, allowBreeder, allowEmployee, authenticateRole, SaleControoler.getAllBreederListSimple)
router.get('/breederSalesList/:buyerId', auth, allowAdmin, allowBreeder, allowEmployee, authenticateRole, SaleControoler.getAllBreederSaleList)
router.get('/breederList', auth, allowBreeder, allowEmployee,authenticateRole, SaleControoler.getAllBreederList)
router.get('/allSale/:sellerId', auth, allowEmployee, allowAdmin, allowBreeder, authenticateRole, SaleControoler.getAllSaleBySellerId )

router.post('/saleAnimal', auth, allowAdmin, allowBreeder, allowEmployee, authenticateRole,autoCharge, SaleControoler.saleAnimal);
router.get('/', auth, allowAdmin, allowBreeder, allowEmployee, authenticateRole, SaleControoler.getSales);
router.get('/:id', auth, allowAdmin, allowBreeder, allowEmployee, authenticateRole, SaleControoler.getSaleDetail);
router.put('/changePaidStatus/:id', auth, allowAdmin, allowBreeder, allowEmployee, authenticateRole, SaleControoler.changePaidStatus);
router.get('/user/:id/:breederId', auth, allowAdmin, allowBreeder, allowEmployee, authenticateRole, SaleControoler.getSaleByUser);
router.get('/graphdata/:breederId', SaleControoler.getGraphData);
router.get('/dashboardSale/:breederId', SaleControoler.dashboardSale);


module.exports = router;