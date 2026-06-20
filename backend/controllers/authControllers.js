import asyncHandler from 'express-async-handler';
import User from '../models/User.js';
import generateToken from '../utils/generateToken.js';


export const register = asyncHandler(async (req, res) => {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
        res.status(400);
        throw new Error("Pleae provide name, email and password");
    }

    console.log("email is ", email);
    const exists = await User.findOne({ email });
    console.log("exists ", exists);
    if (exists) {
        res.status(400);
        throw new Error("Email already registered");
    }

    const user = await User.create({
        name,
        email,
        password,
        role: role === 'admin' ? 'admin' : 'user',
    });

    let token = generateToken(user._id);
    console.log("token is ", token);

    res.status(201).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: `Bearer ${token}`
    });
});

export const login = asyncHandler(async (req, res) => {

    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await user.matchPassword(password))) {
        res.status(401);
        throw new Error("Invlid email or password");
    }

    let token = generateToken(user._id);

    res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: `Bearer ${token}`
    })

});

export const getMe = asyncHandler(async (req, res) => {
    const user = User.findById(req.user._id).populate('followedActors', 'name photoUrl').populate('watchedMovies', 'title posterUrl');
    res.json(user);
})