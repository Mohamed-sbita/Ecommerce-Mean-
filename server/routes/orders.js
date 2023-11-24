const express = require("express");
const router = express.Router();
const ordersController = require("../controllers/orders");

router.get("/get-all-orders", ordersController.getAllOrders);
router.get("/order-by-user/:id", ordersController.getOrderByUser);

router.post("/create-order", ordersController.postCreateOrder);
router.put("/update-order/:id", ordersController.postUpdateOrder);
router.post("/delete-order", ordersController.postDeleteOrder);

module.exports = router;
