import mongoose from "mongoose";
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema({ 
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: [8, "Password must be at least 8 characters"],
        maxlength: [32, "Password cannot be more then 32 characters"],
        required: true
    },
    phone : String,
    profilePicture: String,
    address : String,
    dateOfBirth : Date,
    accountVerified : {type : Boolean, required: false},
    verificationCode : Number,
    verificationCodeExpires : Date,
    resetPasswordToken : String,
    resetPasswordTokenExpire : Date,
    isAdmin: {type: Boolean, required: false},
    createdAt: {
        type: Date,
        default: Date.now
    }
})


userSchema.pre('save', async function(next) {
    if(!this.isModified('password')){
        return next()
    }   
    const hashedPassword = await bcrypt.hash(this.password, 10)
    this.password = hashedPassword
})

userSchema.methods.comparePassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

const User = mongoose.model('User', userSchema)
export default User;