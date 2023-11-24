const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categories");

router.get("/all-category", categoryController.getAllCategory);
router.post("/add-category", categoryController.postAddCategory);
router.put("/edit-category/:id", categoryController.postEditCategory);
router.delete("/delete-category/:id", categoryController.getDeleteCategory);
router.get("/single-category/:id", categoryController.getSingleCategorie);

module.exports = router;
