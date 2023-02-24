const billModel = require("../models/billsModel");

//add Bill
const addBillsController = async (req, res) => {
  try {
    const newBill = new billModel(req.body);
    await newBill.save();
    res.send("Bill Created Successfully!");
  } catch (error) {
    res.send("error");
    console.log(error);
  }
};

//get Bill
const getBillsController = async (req, res) => {
  try {
    const bills = await billModel.find();
    res.send(bills);
  } catch (error) {
    res.send("error");
    console.log(error);
  }
};

module.exports = { addBillsController, getBillsController };
