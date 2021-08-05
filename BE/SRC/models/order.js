const { TooManyRequests } = require("http-errors")
const mongoose = require("mongoose")

const contactSchema = mongoose.Schema({
    contacter: { required: true, type: String },
    email: { required: true, type: String },
    tel: { required: true, type: String }
})
//main
const orderSchema = mongoose.Schema({
    userID: { required: true, type: mongoose.SchemaTypes.ObjectId },
    luggageID: { required: true, type: mongoose.SchemaTypes.ObjectId },
    serviceID: { required: true, type: mongoose.SchemaTypes.ObjectId },
    flightID: { required: true, type: mongoose.SchemaTypes.ObjectId },
    contact: { required: true, type: contactSchema },
    shuttleID: { required: true, type: mongoose.SchemaTypes.ObjectId },
    price: { required: true, type: Number, default: 0 },
    passenger: { required: true, type: Array },
    status: { required: true, type: String, default: 'red'}
}, { collection: 'orders' }) //sửa database
//---------------------------------------------------------------------------

//flight
const flightSchema = mongoose.Schema({
    airplaneID: { required: true, type: mongoose.SchemaTypes.ObjectId },
    from: { required: true, type: mongoose.SchemaTypes.ObjectId },
    to: { required: true, type: mongoose.SchemaTypes.ObjectId },
    departureTime: { required: true, type: String },
    landingTime: { required: true, type: String },
    price: { required: true, type: Number, default: 0 },
}, { collection: 'flight' })

const airlineSchema = mongoose.Schema({
    name: { required: true, type: String }
}, { collection: 'airline' })

const airplaneSchema = mongoose.Schema({
    airlineID: { required: true, type: mongoose.SchemaTypes.ObjectId },
    name: { required: true, type: String }
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
    name: { required: true, type: String }
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
    city: mongoose.model('city', citySchema),
    airport: mongoose.model('airport', airportSchema),
    luggage: mongoose.model('luggage', luggageSchema),
    service: mongoose.model('service', serviceSchema),
    shuttle: mongoose.model('shuttle', shuttleSchema),
    planeclass: mongoose.model('planeclass', classSchema),
    contact: mongoose.model('contact', contactSchema)
}