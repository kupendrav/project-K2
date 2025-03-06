import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: [6, 'Email must be at least 6 characters long'],
        maxLength: [255, 'Email must be at most 255 characters long']
    },
    password: {
        type: String,
        select: false,
    },
    
});

userSchema.statics.haspassword = async function(email, password) {
    return await bcrypt.hash(password, 10);
}
userSchema.methods.isValidPassword = async function(password) {
    return await bcrypt.compare(password, this.password);
}
userSchema.methods.genertaeJWT = function() {
    return jwt.sign({ email: this.email }, process.env.JWT_SECRET);
}

const User = mongoose.model('User', userSchema);
export default User;