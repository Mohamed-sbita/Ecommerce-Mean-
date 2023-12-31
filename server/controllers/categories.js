const { toTitleCase } = require("../config/function");
const categoryModel = require("../models/categories");

class Category {
  async getAllCategory(req, res) {
    try {
      let Categories = await categoryModel.find({}).sort({ _id: -1 });
      if (Categories) {
        return res.json(Categories );
      }
    } catch (err) {
      console.log(err);
    }
  }

  async postAddCategory(req, res) {
    let { cName, cDescription } = req.body;
   
    if (!cName || !cDescription) {
     
        return res.json({ error: "All filled must be required" });
      
    } else {
      cName = toTitleCase(cName);
      try {
        let checkCategoryExists = await categoryModel.findOne({ cName: cName });
        if (checkCategoryExists) {
          
            return res.json({ error: "Category already exists" });
          
        } else {
          let newCategory = new categoryModel({
            cName,
            cDescription,
           
          });
          await newCategory.save((err) => {
            if (!err) {
              return res.json({ success: "Category created successfully" });
            }
          });
        }
      } catch (err) {
        console.log(err);
      }
    }
  }

  async postEditCategory(req, res) {
    let cId = req.params.id
    let  {cDescription,cName}  = req.body;
    if (!cId || !cName|| !cDescription ) {
      return res.status(400).json({cDescription,cId,cName });
    }
    try {
      let editCategory = categoryModel.findByIdAndUpdate(cId, {
        cName,
        cDescription,
        updatedAt: Date.now(),
      });
      let edit = await editCategory.exec();
      if (edit) {
        return res.json({ success: "Category edit successfully" });
      }
    } catch (err) {
      console.log(err);
    }
  }

  async getDeleteCategory(req, res) {
    let cId  = req.params.id;
    if (!cId) {
      return res.json({ error: "All filled must be required" });
    } else {
      try {
       

        let deleteCategory = await categoryModel.findByIdAndDelete(cId);
        if (deleteCategory) {
          
         return res.json({ success: "Category deleted successfully" });
         
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
  async getSingleCategorie(req, res) {
    let  id  = req.params.id;
    if (!id) {
      return res.json({ error: "All filled must be required" });
    } else {
      try {
        let singlecategory = await categoryModel
          .findById(id)
        if (singlecategory) {
          return res.json( singlecategory );
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
}

const categoryController = new Category();
module.exports = categoryController;
