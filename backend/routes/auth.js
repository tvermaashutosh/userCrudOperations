const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secret = 'MechanicalEngineeringExploratoryProjectFlappingBirdMechanismIIT(BHU)Varansi';
const fetchUser = require('../middleware/fetchUser');

// Create a User using: POST "/api/auth/createuser". No login required.
router.post('/createuser', [
  body('name', 'Enter a valid name').isLength({ min: 3 }),
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password must be atleast 8 characters long').isLength({ min: 8 }),
], async (req, res) => {
  let success = false
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ success, errors: errors.array() });
  }
  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({ success, error: 'This user already exists!' });
    }
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);
    user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: secPass,
    })
    const data = {
      user: {
        id: user.id,
      }
    }
    const authToken = await jwt.sign(data, secret);
    success = true
    res.json({ success, authToken });
  }
  catch (error) {
    console.error(error.message);
    res.status(500).send('Sorry! an error occured');
  }
})


// Authenticate a User using: POST "/api/auth/login". No login required.
router.post('/login', [
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password must be atleast 8 characters long').isLength({ min: 8 }),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    let success = false
    if (!user) {
      return res.status(400).json({ success, error: "Please enter correct particulars" });
    }
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      return res.status(400).json({ success, error: "Please enter correct particulars" });
    }
    const data = {
      user: {
        id: user.id,
      }
    }
    const authToken = await jwt.sign(data, secret);
    success = true
    res.json({ success, authToken });
  }
  catch (error) {
    console.error(error.message);
    res.status(500).send('Sorry! an error occured');
  }
});


// Get loggedin User details using: POST "/api/auth/getuser". Login required.
router.post('/getuser', fetchUser, async (req, res) => {
  try {
    const userID = req.user.id;
    const user = await User.findById(userID).select("-password");
    res.send(user);
  }
  catch (error) {
    console.error(error.message);
    res.status(500).send('Sorry! an error occured');
  }
});

module.exports = router;
