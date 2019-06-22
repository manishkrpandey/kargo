const { validationResult } = require('express-validator/check');
const sendOTP = require('./otpVerification');
const msg91 = require("msg91")("280202A2B6vPY0PR5cfbbb5d", "MSGIND", "2");
const mobileNo = "9711189363";

const registration = require('../../models/register');

exports.getLogin = async (req, res, next) => {
  // msg91.send(mobileNo, "12345", function (err, response) {
  //   console.log(err);
  //   console.log(response);
  // });
  console.log(req.body.mobileNumber);
  const isvalid = await registration.find({ "mobileNumber": req.body.mobileNumber, "password": req.body.password }).then((res) => {
    console.log(res);
    if (res.length) {
      sendOTP.sendOTP(req.body.mobileNumber);
      return true
    }
    return false;
  }).catch((err) => { console.log(err) });
  if (isvalid) {
    res.status(200).json({
      data: [
        {
          isLoggedIn: true,
          loginAt: new Date()
        }
      ]
    });
  } else {
    res.status(204).json({
      data: [
        {
          isLoggedIn: false,
          loginAt: new Date()
        }
      ]
    });
  }

};

