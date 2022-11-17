const { ObjectId } = require("mongodb");
const mongo = require("../connect");

module.exports.newRoom = async (req, res) => {
    try {
        const roomDetails = {
            isBooked: false,
            isDeleted: false,
            ...(req?.body ?? {}),
        };
        console.log(roomDetails);
        await mongo.selectedDb.collection("rooms").insertOne(roomDetails);
        res.status(200).send({ message: "New room added" });
    } catch (err) {
        res.status(500).send(err);
    }
};

module.exports.roomInfo = async (req, res, next) => {
    try {
        const roomData = await mongo.selectedDb
            .collection("rooms")
            .find({ isDeleted: false })
            .toArray();
        res.send(roomData);
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
};

module.exports.isBooked = async (req, res, next) => {
    try {
        const updatedData = await mongo.selectedDb
            .collection("rooms")
            .findOneAndUpdate(
                { _id: ObjectId(req.params.roomId) },
                { $set: { ...req.body } },
                { returnOriginal: true }
            );
        res.send(updatedData);
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
};