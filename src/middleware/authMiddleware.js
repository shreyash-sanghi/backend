const jwt = require("jsonwebtoken");
const User = require("../models/register");
const asyncHandler = require("express-async-handler");
const register = require("../models/register");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      console.log(token)
      const decoded = jwt.verify(token, "abcdrghsfdsgf326468jklsad$5%^jhfgsdjf12xz");

      req.user = await register.findById(decoded._id).select("-password");
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

module.exports = { protect };
