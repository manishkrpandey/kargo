const express = require('express');
const { body } = require('express-validator/check');

const registerController = require('../controllers/register');

const router = express.Router();

// GET /register/posts
router.get('/posts', registerController.getPosts);

// POST /register/post
router.post(
  '/new-register',
  [
    body('firstName')
      .trim()
      .isLength({ min: 5 }),
    body('lastName')
      .trim()
      .isLength({ min: 3}),
    body('mobileNumber')
      .trim()
      .isLength({ min: 10 }),
    body('secondaryContact')
      .trim()
      .isLength({ min: 10 }),
    body('ownerName')
      .trim()
      .isLength({ min: 5 }),
    body('ownerContact')
      .trim()
      .isLength({ min: 10 }),
    body('vehicleRegistrationNumber')
      .trim()
      .isLength({ min: 8 }),
    body('driversDLNumber')
      .trim()
      .isLength({ min: 8 }),
    body('allowedStateForTransportation')
      .trim()
      .isLength({ min: 1 }),
    body('password')
      .trim()
      .isLength({ min: 1 })
  ],
  registerController.createPost
);

module.exports = router;


// firstName: firstName,
// lastName: lastName,
// mobileNumber:mobileNumber,
// secondaryContact:secondaryContact,
// isOwner:isOwner,
// isDriver:isDriver,
// ownerName:ownerName,
// ownerContact:ownerContact,
// vehicleRegistrationNumber:vehicleRegistrationNumber,
// driversDLNumber:driversDLNumber,
// hasNationalPermit:hasNationalPermit,
// allowedStateForTransportation:allowedStateForTransportation,
// dlSnappshot:'images/dl.png',
// vehicleSnapshot:vehicleSnapshot
