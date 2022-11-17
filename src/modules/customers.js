const { ObjectId } = require("mongodb");
const mongo = require("../connect");

module.exports.newCustomer = async (req, res) => {
    try {
        const customerDetails = {
            isDeleted: false,
            ...(req?.body ?? {}),
        };
        console.log(customerDetails);
        await mongo.selectedDb.collection("customers").insertOne(customerDetails);
        res.status(200).send({ message: "New customer added" });
    } catch (err) {
        res.status(500).send(err);
    }
};

module.exports.fetchCustomer = async (req, res, next) => {
    try {
        const customerData = await mongo.selectedDb
            .collection("customers")
            .find({ isDeleted: false })
            .toArray();
        res.send(customerData);
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
};

module.exports.booking = async (req, res, next) => {
    try {
        const updatedData = await mongo.selectedDb
            .collection("customers")
            .findOneAndUpdate(
                { _id: ObjectId(req.params.customerId) },
                { $set: { ...req.body } },
                { returnOriginal: true }
            );
        res.send(updatedData);
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
};