const Address = require("../models/Address");

const saveNewAddress = async (request) =>{
    console.log("Address Service", request);
    try {

        let newAddress = new Address({
            streetName: request.streetName,
            streetNo: request.streetNo,
            country: request.country,
            state: request.state,
            localGovernment: request.localGovernment
        })

        let savedAddress = await newAddress.save();

        console.log("Address Service Id ", savedAddress._id);
        return savedAddress;
        
    } catch (error) {
        
    }
}

module.exports = { saveNewAddress };