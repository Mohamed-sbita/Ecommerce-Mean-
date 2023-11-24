const express = require("express");
const router = express.Router();
const productController = require("../controllers/products");
const multer = require("multer");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/products");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.get("/products", productController.getAllProduct);
router.get("/products/:id", productController.getProductByCategory);

router.post("/add-product", upload.any(), productController.postAddProduct);
router.put("/edit-product/:id", upload.any(), productController.postEditProduct);
router.delete("/delete-product/:id", productController.getDeleteProduct);
router.get("/single-product/:id", productController.getSingleProduct);

module.exports = router;
