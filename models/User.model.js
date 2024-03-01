const mongoose = require('mongoose')
const validator = require('validator')
const ObjectId = mongoose.Schema.Types.ObjectId;
const bcrypt = require('bcryptjs')
const userSchema = mongoose.Schema(
  {
    userName: {
      type: String,
      required: false,
      trim: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate: [validator.isEmail],
    },

    password: {
      type: String,
      required: true,
      trim: true,
    },
    confirmPassword: {
      type: String,
      required: false,
    },
    status: {
      type: String,
      enum: ["active", "inactive", "blocked"],
      default: "active",
    },
    role: {
      type: String,
      enum: ["admin", "member"],
      default: "member",
    },
    teams: [
      {
        type: ObjectId,
        ref: "Team",
      },
    ],
    passwordChangeAt: Date,
    passwordChangeResetAt: String,
    passWordResetExpired: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
  },
  {
    timestamps: true,
  }
);
userSchema.pre("save", function(next){
   const password = this.password
   const hashPassword = bcrypt.hashSync(password)
   this.password = hashPassword,
   this.confirmPassword = undefined
   next()

})


userSchema.methods.comparePassword = function (password, hash) {
const isPasswordValid = bcrypt.compareSync(password, hash)
return isPasswordValid
}
const Users = mongoose.model('Users', userSchema);

module.exports = Users;
