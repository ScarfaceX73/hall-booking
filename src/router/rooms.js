const express = require("express");
const router = express.Router();
const roomsModule = require("../modules/rooms");

router.get("/get", roomsModule.roomInfo);

router.post("/add", roomsModule.newRoom);

router.put("/update/:roomId", roomsModule.isBooked);

module.exports = router;