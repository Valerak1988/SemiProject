const jwt = require("jsonwebtoken");
const User = require("../Models/UserModel");

module.exports = async (req, res, next) => {
  try {
    // Get user credentials from the request body
    const { email, pass, fullName } = req.body;

    // Find the user in the database by email
    const user = await User.findOne({ email });

    // Check if user is administrator
    if (!user || user.role !== "administrator") {
      return res.status(401).json({ msg: "Unauthorized. Administrator privileges required." });
    }

    // If user is administrator, generate token
    const token = jwt.sign({ email, pass, fullName }, process.env.PRIVATE_KEY, {
      expiresIn: "1h",
    });

    // Set the token in the session
    req.session.user = token;

    next();
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};