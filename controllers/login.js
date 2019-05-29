const { validationResult } = require('express-validator/check');

const registration = require('../models/register');

exports.getLogin = async (req, res, next) => {
    console.log(req.body.mobileNumber);
    const isvalid = await registration.find({ "mobileNumber": req.body.mobileNumber,"password":req.body.password }).then((res) => {
        if (res.length) {
          return true
        }
        return false;
      }).catch((err)=>{});
      if(isvalid){
        res.status(200).json({
            data: [
              {
                isLoggedIn:true,
                loginAt: new Date()
              }
            ]
          });
      }else{
        res.status(201).json({
            data: [
              {
                isLoggedIn:false,
                loginAt: new Date()
              }
            ]
          });
      }

};

