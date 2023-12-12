import mongoose, { Schema } from 'mongoose';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import config from 'config';

const JWT_SECRET = config.get('jwt.secret');
const JWT_EXPIRE = config.get('jwt.expiresIn');

const userSchema = new Schema({
    email: { type: String, unique: true },
    name: { type: String, select: false },
    password: { type: String },
});

userSchema.pre('save', async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);;

});

// Sign JWT and return token
userSchema.methods.getSignedJWT = function () {
    return jwt.sign({ id: this._id }, JWT_SECRET, {
        expiresIn: JWT_EXPIRE,
    });
};

// Compares entered password with stored password
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.toJSON = function () {
    var obj = this.toObject();
    delete obj.password;
    return obj;
};

export default mongoose.model('User', userSchema, 'user');
