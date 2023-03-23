const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const jwt = require('jsonwebtoken'); 
const User = require('./models/user');
require('dotenv').config();

exports.local = passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

exports.getToken = (user) => {
    return jwt.sign(
        user, 
        process.env.ACCESS_TOKEN_SECRET, 
        { expiresIn: '10s' }
    );
};

exports.getRefreshToken = (user) => {
    return jwt.sign(
        user, 
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: '7d' }
    );
};

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.ACCESS_TOKEN_SECRET;

exports.jwtPassport = passport.use(
    new JwtStrategy(
        opts,
        async (jwt_payload, done) => {
            console.log('JWT payload:', jwt_payload);
            try {
                const user = await User.findOne({ _id: jwt_payload._id }).exec();
                if (!user) {
                    return done(null, false);
                } else {
                    return done(null, user);
                }
            } catch (err) {
                return done(err, false);
            }
        }
    )
);

exports.verifyUser = (req, res, next) => {
    console.log('verify user reached');
    passport.authenticate('jwt', { session: false }, (err, user) => {
        if (err) {
            return next(err);
        } else if (!user) {
            res.setHeader('Content-Type', 'application/json');
            return res.status(401).json({ error: 'Unauthorized' });
        } else {
            req.user = user;
            return next();
        }
    })(req, res, next);
};

exports.verifyAdmin = (req, res, next) => {
    console.log(req.user);
    if (req.user?.admin) {
        return next();
    } else {
        res.status(403).json({ error: 'This user is not an admin.' });
    }
};