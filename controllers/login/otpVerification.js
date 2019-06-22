const msg91 = require("msg91")("280202A2B6vPY0PR5cfbbb5d", "MSGIND", "2");
const registration = require('../../models/register');

exports.sendOTP = async (mobileNumber) => {
    var val = Math.floor(1000 + Math.random() * 9000);
    registration.findOneAndUpdate({ "mobileNumber": mobileNumber }, { $set: { otp: val } }, { new: true }).then((docs) => {
        if (docs) {
            var messageString = 'OTP for registration is ' + val + ' Valid for 1 hour';
          //  console.log('added', docs);
           // sendOTPAction(1234, messageString);
        } else {
            console.log('no user')
        }
    }).catch((err) => {
    });
};

sendOTPAction = (mobileNumber, message) => {
    msg91.send('9711189363', message, function (err, response) {
        console.log(response, 'message sent to', mobileNumber, 'otp is', message);
    });
}

exports.validateOTP = (req, res, next) =>{
    if(req.body.mobileNumber!=="" && req.body.otp!==""){
        registration.findOne({ "mobileNumber": req.body.mobileNumber,"otp":req.body.otp }, function (err, doc) {
            if (doc) {
                console.log('otp matched');
            res.status(200).json({
                data: [
                  {
                    validateOTP: true,
                    loginAt: new Date()
                  }
                ]
              });
            }else{
    
            res.status(405).json({
                data: [
                  {
                    validateOTP: false,
                    loginAt: new Date()
                  }
                ]
              });
            }
            
        });
    }else{
        res.status(406).json({
            data: [
              {
                message:'Invalid Mobile Number or OTP'
              }
            ]
          });
    }

}
