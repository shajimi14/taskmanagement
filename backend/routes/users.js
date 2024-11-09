const router = require("express").Router();
const User = require("../models/users")
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

router.post("/sign-in", async (req, res) => {
    try {
        const { username } = req.body;
        const { email } = req.body;
        const existingUser = await User.findOne({ username });
        const existingEmail = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Username already exists" });
        } else if (username.length < 4) {
            return res.status(400).json({ message: "Username should have atleast 4 characters" });
        }
        if (existingEmail) {
            return res.status(400).json({ message: "Email already exists" });
        }
        const hashPass = await bcrypt.hash(req.body.password, 10);
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashPass,
        });
        await newUser.save()
        return res.status(200).json({ message: "Signin successful" });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal Server Error" })
    }
});

router.post("/log-in", async (req, res) => {
    try {
        const { username } = req.body;
        const { password } = req.body;
        const existingUser = await User.findOne({ username })
        if (!existingUser) {
            return res.status(400).json({ message: "Invalid Credentials" })
        }
        bcrypt.compare(password, existingUser.password, (err, data) => {
            if (data) {
                const authClaims = [{ name: username }, { jti: jwt.sign({}, "hmbTM") }]
                const token = jwt.sign({ authClaims }, "hmbTM", { expiresIn: "2d" })
                res.status(200).json({ id: existingUser._id, token: token })
            }
            else {
                return res.status(400).json({ message: "Invalid Credentials" })
            }
        })
    } catch (error) {
        console.log(error)
    }
})

module.exports = router;