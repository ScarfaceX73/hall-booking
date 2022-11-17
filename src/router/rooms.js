const express = require("express");
const router = express.Router();
const roomsModule = require("../modules/rooms");

router.get("/get", jobModule.roomInfo);

router.post("/add", jobModule.newRoom);

router.put("/update/:roomId", jobModule.isBooked);

module.exports = router;