const express = require("express");
const router = express.Router();
const { default: axios } = require("axios");

router.post("/checkout", async (req, res) => {
      const url = "https://developers.flouci.com/api/generate_payment";
      const payload = {
        app_token: "029e89a4-da10-496c-bc9b-089aff59b7f6",
        app_secret: "f0656978-6668-4c1b-b4e8-bd8f2e1c60e8",
        accept_card: "true",
        amount: req.body.items *1000,
        success_link: `http://localhost:${process.env.PORT}/success.html`,
        fail_link: `http://localhost:${process.env.PORT}/cancel.html`,
        session_timeout_secs: 1200,
        developer_tracking_id: "542cc651-c48d-4c60-ab1b-42057846d4a5",
      };
    
      await axios
        .post(url, payload)
        .then((result) => {
          res.send(result.data);
        })
        .catch((err) =>console.log(err.message));
    });
    module.exports = router;
