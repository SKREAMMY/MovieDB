import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            trim: true
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            minLength: [6, "Password must be atleast 6 characters"],
            select: false,
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            lowercase: true,
            trim: true,
            match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email'],

        },
        role: {
            type: String,
            enum: ['user', 'admin'],
            default: 'user'
        },
        followedActors: [{
            type: mongoose.Schema.Types.ObjectId, ref: 'Actor'
        }],
        watchedMovies: [{
            type: mongoose.Schema.Types.ObjectId, ref: 'Movie'
        }]
    },
    {
        timestamps: true
    }
);

// hash password before saving
userSchema.pre('save', async function () {
    if (!this.isModified('password')) return;
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// method to check plain text password against hash
userSchema.methods.matchPassword = function (enteredPassword) {
    return bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);
export default User;