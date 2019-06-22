const { validationResult } = require('express-validator/check');

const registration = require('../../models/register');


exports.registerNewUserpartone = async (req, res, next) => {
  const errors = validationResult(req);
  console.log(req.body);
  // if (!errors.isEmpty()) {
  //   return res.status(422).json({
  //     message: 'Validation failed, entered data is incorrect.',
  //     errors: errors.array()
  //   });
  // }

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
  const dlSnappshot = req.body.dlSnappshot;
  const password=req.body.password;
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
    dlSnappshot: 'images/dl.png',
    vehicleSnapshot: vehicleSnapshot,
    password:password
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
  console.log('inside',req.body);
  if (!isvalid) {
    registrationnew
      .save()
      .then(result => {
        res.status(201).json({
          message: 'User created successfully!',
          registration: result
        });
      })
      .catch(err => {
      });
  } else {
    res.status(200).json({
      data: [
        {

          message: `User Already exist with this number ${req.body.mobileNumber}`
          

          
        }
      ]
    });
  }

}
