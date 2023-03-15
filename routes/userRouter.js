const express = require('express');
const userRouter = express.Router();
const User = require('../models/user');
const passport = require('passport');
const authenticate = require('../authenticate');

userRouter.route('/')
.get(authenticate.verifyUser, authenticate.verifyAdmin, async (req, res, next) => {
    try {
        const allUsers = await User.find();
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(allUsers);
    } catch (err) {
        return next(err);
    }
})
.delete(authenticate.verifyUser, authenticate.verifyAdmin, async (req, res, next) => {
    try {
        await User.deleteMany();
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({ success: true, status: 'All users successfully deleted.'});
    } catch (err) {
        return next(err);
    }
});

userRouter.route('/:userId')
.get(authenticate.verifyUser, async (req, res, next) => {
    try {
        if (req.user._id.equals(req.params.userId) || req.user.admin) {
            const user = await User.findById(req.params.userId);
            console.log(user);
            if (user) {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(user);
            } else {
                res.statusCode = 404;
                res.setHeader('Content-Type', 'text/plain');
                res.end('This user does not exist.');
            }
        } else {
            const err = new Error('You are not authorized to view this user.');
            res.statusCode = 403;
            return next(err);
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

            if (updatedUser) {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json({ success: true, updatedUser, status: 'User successfully updated.' });
            } else {
                res.statusCode = 404;
                res.setHeader('Content-Type', 'text/plain');
                res.end('This user does not exist.');
            }
        } else {
            const err = new Error('You are not authorized to modify this user.');
            res.statusCode = 403;
            return next(err);
        }
    } catch (err) {
        return next(err);
    }
})
.delete(authenticate.verifyUser, async (req, res, next) => {
    try {
        if (req.user._id.equals(req.params.userId) || req.user.admin) {
            const deletedUser = await User.findByIdAndDelete(req.params.userId);
            
            if (deletedUser) {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json({ success: true, deletedUser, status: 'User successfully deleted.' });
            } else {
                res.statusCode = 404;
                res.setHeader('Content-Type', 'text/plain');
                res.end('This user does not exist.');
            }
        } else {
            const err = new Error('You are not authorized to delete this user.');
            res.statusCode = 403;
            return next(err);
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
                        res.status(200).json({ success: true, status: 'Registration successful.' });
                    });
                }
            );
        } else {
            res.status(409).json({ 
                error: 'This username or email is linked to an existing account. Please try again. Redirecting...'
            });
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
            if (info.message === 'Missing credentials') {
                res.status(400).json({ success: false, message: 'Username and password are required' });
            } else if (info.message === 'Password or username is incorrect') {
                res.status(401).json({ success: false, message: 'Username or password is incorrect' });
            }
        } else {
            try {
                const token = authenticate.getToken({ _id: user._id });
                res.setHeader('Content-Type', 'application/json');
                if (user.admin) {
                    res.status(200).json({ 
                        success: true, 
                        token: token, 
                        admin: true, 
                        status: 'You have successfully logged in.'
                    });
                } else {
                    res.status(200).json({ 
                        success: true, 
                        token: token, 
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