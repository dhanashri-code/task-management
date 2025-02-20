const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { Schema } = mongoose;
const userSchema = new Schema({

    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true,
    },
    userName: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        unique: true
    },

});

userSchema.pre("save", async function (next) {
    const user = this;
    if (!user.isModified('password')) return next();
    try {
        let salt = await bcrypt.genSalt(10);
        let hash = await bcrypt.hash(user.password, salt);
        user.password = hash;
        next();
    }
    catch (err) {
        next(err);
    }
})

userSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password);
}

const User = new mongoose.model("User", userSchema);

module.exports = User;