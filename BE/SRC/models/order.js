const { array } = require("joi")
const mongoose = require("mongoose")

const orderSchema = mongoose.Schema({
    orderID: { required: true, type: mongoose.SchemaTypes.ObjectId },
    customer: { required: true, type: String },
    passengerList: { required: true, type: [mongoose.SchemaTypes.ObjectId] },
    price: { required: true, type: Number },
    shuttleID: { required: true, type: mongoose.SchemaTypes.ObjectId },
    luggageID: { required: false, type: mongoose.SchemaTypes.ObjectId },
    flightID: { required: true, type: mongoose.SchemaTypes.ObjectId },
})

const luggageSchema = mongoose.Schema({
    luggageID: { required: true, type: mongoose.SchemaTypes.ObjectId },
    luggageName: { required: true, type: String },
    luggageFee: { required: true, type: Number },
})

const shuttleSchema = mongoose.Schema({
    shuttleID: { required: true, type: mongoose.SchemaTypes.ObjectId },
    shuttleName: { required: true, type: String },
    shuttleFee: { required: true, type: Number },
})

const passengerSchema = mongoose.Schema({
    passengerID: { required: true, type: mongoose.SchemaTypes.ObjectId },
    passengerName: { required: true, type: String },
    passengerDob: { required: true, type: String },
    passengerNat: { required: true, type: String },
})

const flightSchema = mongoose.Schema({
    flightID: { required: true, type: mongoose.SchemaTypes.ObjectId },
    flightName: { required: true, type: String },
    airlineID: { required: true, type: mongoose.SchemaTypes.ObjectId },
    airplaneID: { required: true, type: mongoose.SchemaTypes.ObjectId },
    departureTime: { required: true, type: String },
    landingTime: { required: true, type: String },
    from: { required: true, type: mongoose.SchemaTypes.ObjectId },
    to: { required: true, type: mongoose.SchemaTypes.ObjectId },
    class: { required: true, type: String },
})

const airlineSchema = mongoose.Schema({
    airlineID: { required: true, type: mongoose.SchemaTypes.ObjectId },
    airlineName: { required: true, type: String },
})

const airplaneSchema = mongoose.Schema({
    airplaneID: { required: true, type: mongoose.SchemaTypes.ObjectId },
    airplaneName: { required: true, type: mongoose.SchemaTypes.ObjectId },
})

module.exports = mongoose.model('order', orderSchema)