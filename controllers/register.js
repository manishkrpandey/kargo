const { validationResult } = require('express-validator/check');

const registration = require('../models/register');

exports.getPosts = (req, res, next) => {
  res.status(200).json({
    posts: [
      {
        _id: '1',
        title: 'First Post',
        content: 'This is the first post!',
        imageUrl: 'images/duck.jpg',
        creator: {
          name: 'Maximilian'
        },
        createdAt: new Date()
      }
    ]
  });
};

exports.createPost = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      message: 'Validation failed, entered data is incorrect.',
      errors: errors.array()
    });
  }

  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const mobileNumber = req.body.mobileNumber;
  const secondaryContact = req.body.secondaryContact;
  const isOwner = req.body.isOwner;
  const isDriver = req.body.isDriver;
  const ownerName = req.body.ownerName;
  const ownerContact = req.body.ownerContact;
  const vehicleRegistrationNumber = req.body.vehicleRegistrationNumber;
  const driversDLNumber = req.body.driversDLNumber;
  const hasNationalPermit = req.body.hasNationalPermit;
  const allowedStateForTransportation = req.body.allowedStateForTransportation;
  const vehicleSnapshot = req.body.vehicleSnapshot;
  const dlSanpshot = req.body.dlSanpshot;
  const registrationnew = new registration({
    firstName: firstName,
    lastName: lastName,
    mobileNumber: mobileNumber,
    secondaryContact: secondaryContact,
    isOwner: isOwner,
    isDriver: isDriver,
    ownerName: ownerName,
    ownerContact: ownerContact,
    vehicleRegistrationNumber: vehicleRegistrationNumber,
    driversDLNumber: driversDLNumber,
    hasNationalPermit: hasNationalPermit,
    allowedStateForTransportation: allowedStateForTransportation,
    dlSanpshot: 'images/dl.png',
    vehicleSnapshot: vehicleSnapshot
  });
  const isvalid = await registration.find({ "mobileNumber": mobileNumber }).then((res) => {
    if (res.length) {
      return true
    }
    return false;
  }).catch((err)=>{});
  createNewUser(req, res, next, isvalid, registrationnew);
};
createNewUser = (req, res, next, isvalid, registrationnew) => {
  if (!isvalid) {
    registrationnew
      .save()
      .then(result => {
        console.log('three', isvalid);
        res.status(201).json({
          message: 'User created successfully!',
          registration: result
        });
      })
      .catch(err => {
        console.log(err);
      });
  } else {
    console.log('four', isvalid);
    res.status(200).json({
      data: [
        {

          message: `User Already exist with this number ${req.body.mobileNumber}`
          

          
        }
      ]
    });
  }

}
