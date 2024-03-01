const jwt = require("jsonwebtoken");
const { promisify } = require("util");

module.exports = async (req, res, next) => {
  try {
    const token = req?.headers?.authorization?.split(" ")[1];
    if (!token) {
      return res
        .status(401)
        .json({ status: "fail", massage: "login failed" });
    }
    const decoded = await promisify(jwt.verify)(token, process.env.TOKEN);
    req.user = decoded;
    console.log(decoded);
    next();
  } catch (error) {
    res.status(400).json({
      status: "fail",
      massage: "token not verified",
      data: error.message,
    });
  }
};
