const express = require("express");
const {
    addBillsController, getBillsController
} = require("./../controllers/billControllers");

const router = express.Router();

//routes

//MEthod - POST
router.post("/add-bills", addBillsController);

//MEthod - GET
router.get("/get-bills", getBillsController);

module.exports = router;
