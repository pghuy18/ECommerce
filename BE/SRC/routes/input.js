var express = require('express');
var router = express.Router();
const user = require("../models/user")
const {order, flight, airline, airplane, passenger, city, airport, luggage, service, shuttle, planeclass} = require('../models/order')
const jwt = require("jsonwebtoken")
const verify = require('../auth/checkToken')
const bcrypt = require("bcryptjs");

//input
router.post('/order', async (req,res) => {
    try {
        const temp = new order()
        const User = await user.findOne({username: req.body.username})
        if (!User)
            return res.status(404).send("User not found")
        temp.userID = User._id

        const Luggage = new luggage()
        Luggage.name = req.body.luggageName
        Luggage.fee = req.body.luggagefee
        const tmp = await Luggage.save()
        temp.luggageID = Luggage._id

        const Service = await service.findOne({name: req.body.serviceName})
        if (!Service)
            return res.status(404).send("Service not found")
        temp.serviceID = Service._id

        const Flight = await flight.findOne({_id: req.body.flightID})
        if (!Flight)
            return res.status(404).send("Flight not found")
        temp.flightID = Flight._id

        temp.contact = req.body.contact

        const Shuttle = await shuttle.findOne({name: req.body.shuttleName})
        if (!Shuttle)
            return res.status(404).send("Shuttle not found")
        temp.shuttleID = Shuttle._id
        temp.price = Flight.price + Shuttle.fee + Luggage.fee + Service.fee

        const Passenger = new passenger()
        Passenger.name = req.body.passengerName
        Passenger.dob = req.body.passengerDOB
        Passenger.nationality = req.body.passengerNationality
        const teemp = await Passenger.save()
        temp.passengerID = Passenger._id

        const tempp = await temp.save()
        return res.status(201).send(temp)
    } catch (err) {
        return res.status(400).send(err)
    }
})

router.post('/flight', async (req,res) => {
    try {
        const temp = new flight()
        const airp = await airplane.findOne({name: req.body.airplaneName})
        if (!airp)
            return res.status(404).send("Airplane not found")
        temp.airplaneID = airp._id

        const depcity = await city.findOne({name: req.body.from})
        if (!depcity)
            return res.status(404).send("Departure city not found")
        temp.from = depcity._id

        const landcity = await city.findOne({name: req.body.to})
        if (!landcity)
            return res.status(404).send("Landing city not found")
        temp.to = landcity._id

        temp.departureTime = req.body.departureTime
        temp.landingTime = req.body.landingTime
        
        const planeClass = await planeclass.findOne({name: req.body.className})
        if (!planeClass)
            return res.status(404).send("Class not found")
        temp.class = planeClass._id
        temp.price = req.body.price

        const tmp = await temp.save()
        return res.status(201).send(temp)
    } catch (err)
    {
        return res.status(400).send(err)
    }
})

router.post('/city', async (req,res) => {
    try {
    const check = await city.findOne({ name: req.body.name })
    if (check)
    {
        return res.status(404).send("City name is not available")
    }

    const temp = new city()
    temp.name = req.body.name
    const tmp = await temp.save()
    return res.status(201).send(temp)
} catch (err)
{
    console.log(err);
    return res.status(400).send(err)
}
})

router.post('/airport', async (req,res) => {
    try {
        const check = await airport.findOne({name: req.body.name})
        if (check)
            return res.status(404).send("Airport name is not available")
        const _check = await city.findOne({name: req.body.cityname})
        if (!_check)
            return res.status(404).send("City not found")
        
        const temp = new airport()
        temp.name = req.body.name
        temp.cityID = _check._id
        const tmp = await temp.save()

        return res.status(201).send({
            _id: temp._id,
            name: temp.name,
            cityName: _check.name
        })
    } catch (err) {
        return res.status(400).send(err)
    }
})

router.post('/airline', async (req, res) => {
    try {
        const check = await airline.findOne({name: req.body.name})
        if(check)
            return res.status(404).send("Airline has already been created")

        const temp = new airline()
        temp.name = req.body.name
        const tmp = await temp.save()
        return res.status(201).send(temp)
    } catch (err) {
        return res.status(400).send(err)
    }
})

router.post('/airplane', async (req, res) => {
    try {
        const check = await airline.findOne({name: req.body.airlineName})
        if (!check)
            return res.status(404).send("Airline not found")
        const _check = await airplane.findOne({name: req.body.name})
        if (_check)
            return res.status(404).send("Airplane has already been created")
        
        const temp = new airplane()
        temp.name = req.body.name
        temp.airlineID = check._id
        const tmp = await temp.save()
        return res.status(201).send(temp)
    } catch (err) {
        return res.status(400).send(err)
    }
})

router.post('/shuttle', async (req, res) => {
    try {
        const check = await shuttle.findOne({name: req.body.name})
        if (check)
            return res.status(404).send("Shuttle has already been created")
        const temp = new shuttle()
        temp.name = req.body.name
        temp.fee = req.body.fee
        const tmp = await temp.save()
        return res.status(201).send(temp)
    } catch (err) {
        return res.status(400).send(err)
    }
})

router.post('/service', async (req, res) => {
    try {
        const check = await service.findOne({name: req.body.name})
        if (check)
            return res.status(404).send("Service has already been created")
        const temp = new service()
        temp.name = req.body.name
        temp.fee = req.body.fee
        const tmp = await temp.save()
        return res.status(201).send(temp)
    } catch (err) {
        return res.status(400).send(err)
    }
})

router.post('/class', async (req, res) => {
    try {
        const check = await planeclass.findOne({name: req.body.name})
        if (check)
            return res.status(404).send("Class has already been created")
        const temp = new planeclass()
        temp.name = req.body.name
        temp.fee = req.body.fee
        const tmp = await temp.save()
        return res.status(201).send(temp)
    } catch (err) {
        return res.status(400).send(err)
    }
})
//-----------------------------------------------------------------------------

module.exports = router