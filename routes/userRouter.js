const express = require('express');
const userRouter = express.Router();
const User = require('../models/user');
const passport = require('passport');
const authenticate = require('../authenticate');

userRouter.route('/')
.get(authenticate.verifyUser, authenticate.verifyAdmin, async (req, res, next) => {
    try {
        const allUsers = await User.find();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json({ allUsers, status: 'All users successfully retrieved.' });
    } catch (err) {
        return next(err);
    }
})
.delete(authenticate.verifyUser, authenticate.verifyAdmin, async (req, res, next) => {
    try {
        const deleteResult = await User.deleteMany({ _id: { $ne: req.user._id } });

        res.setHeader('Content-Type', 'application/json');
        if (deleteResult.deletedCount === 0) {
            res.status(404).json({ status: 'No other users found to delete.' });
        }
        res.status(200).json({ status: 'All users successfully deleted.'});
    } catch (err) {
        return next(err);
    }
});

userRouter.route('/:userId')
.get(authenticate.verifyUser, async (req, res, next) => {
    try {
        if (req.user._id.equals(req.params.userId) || req.user.admin) {
            const user = await User.findById(req.params.userId);

            res.setHeader('Content-Type', 'application/json');
            if (user) {
                res.status(200).json({ user, status: 'User successfully retrieved.' });
            } else {
                res.status(404).json({ error: 'This user does not exist.' });
            }
        } else {
            res.setHeader('Content-Type', 'application/json');
            res.status(403).json({ error: 'You are not authorized to view this user.' });
        }
    } catch (err) {
        return next(err);
    }
})
.put(authenticate.verifyUser, async (req, res, next) => {
    try {
        if (req.user._id.equals(req.params.userId) || req.user.admin) {
            const updatedUser = await User.findByIdAndUpdate(req.params.userId, {
                $set: req.body
            }, {new: true});

            res.setHeader('Content-Type', 'application/json');
            if (updatedUser) {
                res.status(200).json({ updatedUser, status: 'User successfully updated.' });
            } else {
                res.status(404).json({ error: 'This user does not exist.' });
            }
        } else {
            res.setHeader('Content-Type', 'application/json');
            res.status(403).json({ error: 'You are not authorized to modify this user.'})
        }
    } catch (err) {
        return next(err);
    }
})
.delete(authenticate.verifyUser, async (req, res, next) => {
    try {
        if (req.user._id.equals(req.params.userId) || req.user.admin) {
            const deletedUser = await User.findByIdAndDelete(req.params.userId);

            res.setHeader('Content-Type', 'application/json');
            if (deletedUser) {
                res.status(200).json({ deletedUser, status: 'User successfully deleted.' });
            } else {
                res.status(404).json({ error: 'This user does not exist.' });
            }
        } else {
            res.setHeader('Content-Type', 'application/json');
            res.status(403).json({ error: 'You are not authorized to delete this user.'})
        }
    } catch (err) {
        return next(err);
    }
});

userRouter.post('/register', async (req, res, next) => {
    try {
        const userExists = await User.findOne({ $or: [{ username: req.body.username}, { email: req.body.email }] });
        if (!userExists) {
            User.register(new User(
                { username: req.body.username, email: req.body.email, admin: req.body.admin }), 
                req.body.password,
                () => {
                    passport.authenticate('local')(req, res, () => {
                        res.setHeader('Content-Type', 'application/json');
                        res.status(200).json({ status: 'Registration successful.' });
                    });
                }
            );
        } else {
            res.setHeader('Content-Type', 'application/json');
            res.status(409).json({ error: 'This username or email is linked to an existing account. Please try again. Redirecting...' });
        }
    } catch (err) {
        return next(err);
    }
});

userRouter.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            res.setHeader('Content-Type', 'application/json');
            if (info.message === 'Password or username is incorrect') {
                res.status(401).json({ error: 'Username or password is incorrect' });
            } else {
                return next(err);
            }
        } else {
            try {
                const token = authenticate.getToken({ _id: user._id });
                res.setHeader('Content-Type', 'application/json');
                if (user.admin) {
                    res.status(200).json({ 
                        token,
                        user,
                        admin: true, 
                        status: 'You have successfully logged in.'
                    });
                } else {
                    res.status(200).json({ 
                        token: token,
                        user,
                        status: 'You have successfully logged in.'
                    });
                }
            } catch (err) {
                return next(err);
            }
        }
    })(req, res, next);
});

module.exports = userRouter;