const { TooManyRequests } = require("http-errors")
const mongoose = require("mongoose")

//main
const orderSchema = mongoose.Schema({
    userID: { required: true, type: mongoose.SchemaTypes.ObjectId },
    luggageID: { required: true, type: mongoose.SchemaTypes.ObjectId },
    serviceID: { required: true, type: mongoose.SchemaTypes.ObjectId },
    flightID: { required: true, type: mongoose.SchemaTypes.ObjectId },
    contact: { required: true, type: String },
    shuttleID: { required: true, type: mongoose.SchemaTypes.ObjectId },
    price: { required: true, type: Number, default: 0 },
    passengerID: { required: true, type: mongoose.SchemaTypes.ObjectId },
    status: { required: true, type: String, default: 'red'}
}, { collection: 'orders' })
//---------------------------------------------------------------------------

//passenger
const passengerSchema = mongoose.Schema({
    name: { required: true, type: mongoose.SchemaTypes.ObjectId },
    dob: { required: true, type: String },
    nationality: { required: true, type: String },
}, { collection: 'passenger' })
//----------------------------------------------------------------------------

//flight
const flightSchema = mongoose.Schema({
    airplaneID: { required: true, type: mongoose.SchemaTypes.ObjectId },
    from: { required: true, type: mongoose.SchemaTypes.ObjectId },
    to: { required: true, type: mongoose.SchemaTypes.ObjectId },
    departureTime: { required: true, type: String },
    landingTime: { required: true, type: String },
    classID: { required: true, type: mongoose.SchemaTypes.ObjectId },
    price: { required: true, type: Number, default: 0 },
}, { collection: 'flight' })

const airlineSchema = mongoose.Schema({
    name: { required: true, type: String }
}, { collection: 'airline' })

const airplaneSchema = mongoose.Schema({
    airlineID: { required: true, type: mongoose.SchemaTypes.ObjectId },
    name: { required: true, type: mongoose.SchemaTypes.ObjectId }
}, { collection: 'airplane' })

const citySchema = mongoose.Schema({
    name: { required: true, type: String }
}, { collection: 'city' })

const airportSchema = mongoose.Schema({
    cityID: { required: true, type: mongoose.SchemaTypes.ObjectId },
    name: { required: true, type: String },
}, { collection: 'airport' })
//----------------------------------------------------------------------

//additional information
const luggageSchema = mongoose.Schema({
    name: { required: true, type: String },
    fee: { required: true, type: Number, default: 0 }
}, { collection: 'luggage' })
const serviceSchema = mongoose.Schema({
    name: { required: true, type: String },
    fee: { required: true, type: Number, default: 0 }
}, { collection: 'service' })
const shuttleSchema = mongoose.Schema({
    name: { required: true, type: String },
    fee: { required: true, type: Number, default: 0 }
}, { collection: 'shuttle' })
const classSchema = mongoose.Schema({
    name: { required: true, type: String },
    fee: { required: true, type: Number, default: 0 }
}, { collection: 'class' })
//------------------------------------------------------------------------
module.exports = {
    order: mongoose.model('order', orderSchema),
    flight: mongoose.model('flight', flightSchema),
    airline: mongoose.model('airline', airlineSchema),
    airplane: mongoose.model('airplane', airplaneSchema),
    passenger: mongoose.model('passenger', passengerSchema),
    city: mongoose.model('city', citySchema),
    airport: mongoose.model('airport', airportSchema),
    luggage: mongoose.model('luggage', luggageSchema),
    service: mongoose.model('service', serviceSchema),
    shuttle: mongoose.model('shuttle', shuttleSchema),
    planeclass: mongoose.model('planeclass', classSchema)
}