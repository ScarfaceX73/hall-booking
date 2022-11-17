const express = require("express");
const router = express.Router();
const customersModule = require("../modules/customers");

router.get("/fetch", customersModule.fetchCustomer);

router.post("/add", customersModule.newCustomer);

router.put("/booking/:customerId", customersModule.booking);

module.exports = router;