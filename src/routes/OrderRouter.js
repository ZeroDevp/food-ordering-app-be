const express = require("express");
const router = express.Router()
const OrderController = require('../controller/OrderController');
const { authMiddleware } = require("../middleware/authMiddleware");

router.post('/create', OrderController.createOrder)
router.get('/get-all-order/:id', OrderController.getAllOrderDetails)
router.get('/get-details-order/:id', OrderController.getDetailsOrder)
router.delete('/cancel-order/:id', OrderController.cancelOrderDetails)
router.get('/getAllOrder', authMiddleware, OrderController.getAllOrder)

//24/11
router.put('/update-status', authMiddleware, OrderController.updateOrderStatus);
router.put('/mark-as-received', OrderController.markOrderAsReceived);
router.get('/revenue-by-month', authMiddleware, OrderController.getRevenueByMonth);
router.get('/available-years', OrderController.getAvailableYears);
router.get('/available-months', OrderController.getAvailableMonths);
router.get('/annual-revenue', OrderController.getAnnualRevenue);

module.exports = router



