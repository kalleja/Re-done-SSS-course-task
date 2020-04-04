
const jwt = require("jsonwebtoken");
const passport = require("passport");

const login = (req, res) => {
    passport.authenticate("local", { session: false }, (err, user, info) => {
        if (err || !user) {
            return res.status(500).json({
                message: "Something is horroblie wrong",
                user: user
            });
        }
        req.login(user, { session: false }, err => {
            if (err) {
                res.send(err);
            }
            const token = jwt.sign(user, process.env.JWT_SECRET);
            return res.json({ user, token });
        });
    })(req, res);
};

module.exports = {
    login
};