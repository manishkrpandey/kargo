const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const registrationSchema = new Schema(
  {
    firstName: {
      type: String,
      
    },
    lastName: {
      type: String,
      
    },
    dlSnappshot: {
      type: String,
    },
    vehicleSnapshot: {
      type: String,
    },
    mobileNumber: {
      type: Number,
      
    },
    secondaryContact: {
      type: Number,
      
    },
    isOwner: {
      type: Boolean,
      
    },
    isDriver: {
      type: Boolean,
      
    },
    ownerName: {
      type: String,
      
    },
    ownerContact: {
      type: Number,
      
    },
    vehicleRegistrationNumber: {
      type: String,
    },
    driversDLNumber: {
      type: String,
      
    },
    hasNationalPermit: {
      type: Boolean
    },
    allowedStateForTransportation: {
      type: Object,
    },
    password: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('registration', registrationSchema);

 