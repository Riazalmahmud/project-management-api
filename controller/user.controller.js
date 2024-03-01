const {
  createUserService,
  getUserService,
  updateUserService,
  changePasswordService,
  getAllUserService,
} = require("../services/user.service");

var fs = require("fs");
var path = require("path");
const bcrypt = require('bcryptjs')
const { generateToken } = require("../utils/utils");
const Users = require("../models/User.model");
const validator = require('validator');
const crypto = require('crypto');
const nodemailer = require('nodemailer');



/** Register a new user
 * Post:  http://localhost:3000/api/v1/user
 * @param: {
  "userName": "Riaz",
  "email": "users041@gmail.com",
  "password": "123456",
  "confirmPassword": "123456",
  "status": "active"
}
*/
exports.createUser = async (req, res, next) => {
  try {
    const user = await createUserService(req.body);
    const { password: pwd, ...others } = user.toObject();
    res.status(200).json({
      status: true,
      message: "user created successfully",
      data: others,
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      massage: "couldn't not fail create user",
      data: error.message,
    });
  }
};


/** get all  users
 * get:  http://localhost:3000/api/v1/user
*/
exports.getUser = async (req, res, next) => {
  try {
    const user = await getAllUserService();
    res.status(200).json({
      status: "success",
      message: "user created successfully",
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      massage: "couldn't not fail create user",
      data: error.message,
    });
  }
};
exports.uploadImage = async (req, res, next) => {
  try {
    const user = await createUserService(req.body);
    // const { password:pwd,...others}= user.toObject();
    res.status(200).json({
      status: "success",
      message: "user created successfully",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      massage: "couldn't not fail create user",
      data: error.message,
    });
  }
};

// user update
exports.updateUser = async (req, res, next) => {
  req.body.imageUrl = __dirname + "/public/images/users/" + req.file?.filename;
  const _id = req.params.id;
  try {
    const user = await updateUserService(_id, req.body);
    res.status(200).json({
      status: "success",
      message: "user updated successfully",
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      massage: "couldn't fail update user",
      data: error.message,
    });
  }
};


/* * login user 
 * Post:  http://localhost:3000/api/v1/user/login
 * @param: {
    "email": "riazalmahmud002@gmail.com",
    "password": "Ri@zalmahmud12346"
}
*/
exports.findUser = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res
        .status(400)
        .json({ status: false, massage: "email and password are required" });
    }
    const user = await getUserService(email);

    if (!user) {
      return res.status(401).json({
        status: false,
        massage: "could not be found email and password",
      });
    }

    const isPasswordValid = user.comparePassword(password, user.password);

    if (!isPasswordValid) {
      return res.status(403).json({
        status: false,
        massage: "password is invalid",
      });
    }
    if (user.status !== "active") {
      return res.status(401).json({
        status: false,
        massage: "user is not active",
      });
    }
    const token = generateToken(user);
    const { password: pwd, ...others } = user.toObject();
    res.status(200).json({
      status: true,
      message: "user get successfully",
      data: others,
      token: token,
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      massage: "couldn't not fail get user",
      data: error.message,
    });
  }
};



/* * get user information
get : http://localhost:3000/api/v1/user/me
@param :{
  Authorization: Bearer <token>
}
 */
exports.getMe = async (req, res) => {
  try {
    const user = await getUserService(req?.user?.email);
    const { password: pwd, ...others } = user.toObject();
    res.status(200).json({
      status: "success",
      message: "user get successfully",
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      massage: "user not verified",
      data: error.message,
    });
  }
};


/** put: http://localhost:3000/api/v1/user/changePassword/:id 
 * @param : {
  "oldPassword" : "admin123",
  "newPassword": "admin123,
}
*/

exports.changePassword =  async (req, res) =>{
  const { id } = req.params;
  const { oldPassword, newPassword } = req.body;

  try {
    const user = await Users.findById(id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Verify the old password
    const isPasswordValid = bcrypt.compareSync(oldPassword, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid old password' });
    }

    // Validate the new password
    if (!validator.isStrongPassword(newPassword, { minLength: 6 })) {
      return res.status(400).json({ error: 'New password must be at least 6 characters long' });
    }

    // Update the password
    user.password = newPassword;
    user.passwordChangeAt = new Date();
    await user.save();
    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      massage: "couldn't not fail change password",
      data: error.message,
    });
  }
}




/** forgetPassword
 * Post:  http://localhost:3000/api/v1/user/forgetPassword
 * @param: {
    "email": "riazalmahmud002@gmail.com",
}

*/

exports.forgetPassword =  async (req, res, next) => {
const { email } = req.body;
  try {
    const user = await Users.findOne({ email})
    if (!user) {
      return res.status(201).json({ error: 'Email not found' });
    }

    // let randomNumber = Math.random();

    // Scale the random number to the range 100000 (inclusive) to 999999 (exclusive)
   let  randomNumber = Math.floor(100000 + Math.random() * 900000);
      // Generate random token
      // const token = crypto.randomBytes(20).toString('hex');

      // Save token to user document
      user.passwordResetToken = randomNumber;
      user.passwordResetExpires = Date.now() + 60000; // Token expires in 1 hour
      await user.save();

      // Send password reset email
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          // TODO: replace `user` and `pass` values from <https://forwardemail.net>
          user: "	developerriaz041@gmail.com",
          pass: "mwvgduxslmrmurhy",
        },
      });
      const mailOptions = {
          from: 'sean.bayer@ethereal.email',
          to: email,
          subject: 'Password Reset Request',
          text: `You are receiving this email because you (or someone else) have requested the reset of the password for your account.\n\n`
              + `Please click on the following link, or paste this into your browser to complete the process:\n\n`
              + `http://localhost:3000/api/v1/user/reset-password/${randomNumber}\n\n `
              + `If you did not request this, please ignore this email and your password will remain unchanged.\n`
              + `this is your OTP password ${randomNumber}\n`
      };
      await transporter.sendMail(mailOptions);

      res.json({ message: 'Password reset email sent', success: true, data : user});
  } catch (error) {
    res.status(404).json({
      status: "fail",
      massage: "couldn't not fail change password",
      data: error.message,
    });
  }
}



exports.resetPassword = async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  try {
      // Find user by password reset token
      const user = await Users.findOne({
          passwordResetToken: token,
          passwordResetExpires: { $gt: Date.now() }
      });
      if (!user) {
          return res.status(400).json({ error: 'Invalid or expired token' });
      }
      // Reset password
      user.password = newPassword;
      user.passwordResetToken = undefined;
      user.passwordResetExpires = undefined;
      await user.save();
      res.json({ message: 'Password reset successfully' });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error', massage: error.message });
  }
}
