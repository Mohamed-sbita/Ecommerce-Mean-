const orderModel = require("../models/orders");

class Order {
  async getAllOrders(req, res) {
    try {
      let Orders = await orderModel
        .find({})
        .populate("allProduct.id", "pName pImages pPrice")
        .populate("user", "firstName lastName")
        .sort({ _id: -1 });
      if (Orders) {
        return res.json(Orders );
      }
    } catch (err) {
      console.log(err);
    }
  }

  async getOrderByUser(req, res) {
    let  uId  = req.params.id;
    if (!uId) {
      return res.json({ message: "All filled must be required" });
    } else {
      try {
        let Order = await orderModel
          .find({ user: uId })
          .populate("allProduct.id", "pName pImages pPrice")
          .populate("user", "name lastName")
          .sort({ _id: -1 });
        if (Order) {
          return res.json( Order );
        }
      } catch (err) {
        console.log(err);
      }
    }
  }

  async postCreateOrder(req, res) {
    let { allProduct, user, amount, transactionId } = req.body;
    if (
      !allProduct ||
      !user ||
      !amount ||
      !transactionId 
     
    ){
      return res.json( {message : "All filled must be required"} );
    } else {
      try {
        let newOrder = new orderModel({
          allProduct,
          user,
          amount,
          transactionId,
          
        });
        let save = await newOrder.save();
        if (save) {
          return res.json({ success: "Order created successfully" });
        }
      } catch (err) {
        return res.json({ error: err });
      }
    }
  }

  async postUpdateOrder(req, res) {
    let oId = req.params.id
    let {status}  = req.body;
    if (!oId || !status) {
      return res.json({ message: "All filled must be required",status });
    } else {
      let currentOrder = orderModel.findByIdAndUpdate(oId, {
        status: status,
        updatedAt: Date.now(),
      });
      currentOrder.exec((err, result) => {
        if (err) console.log(err);
        return res.json({ success: "Order updated successfully" , status })
      });
    }
  }

  async postDeleteOrder(req, res) {
    let { oId } = req.body;
    if (!oId) {
      return res.json({ error: "All filled must be required" });
    } else {
      try {
        let deleteOrder = await orderModel.findByIdAndDelete(oId);
        if (deleteOrder) {
          return res.json({ success: "Order deleted successfully" });
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
}

const ordersController = new Order();
module.exports = ordersController;
