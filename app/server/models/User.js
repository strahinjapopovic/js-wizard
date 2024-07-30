const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    require: false,
    unique: false,
    trim: true,
    default: "n/a",
  },
  lastName: {
    type: String,
    require: false,
    unique: false,
    trim: true,
    default: "n/a",
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    unique: [true, 'Email already exists'],
    required: [true, 'Email address required'],
    validate: {
        validator: (e) => {
            return /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(e);
        },
        message: (props) => {
            `${props.value} is not a valid email address!`;
        },
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
      type: Date,
      default: Date.now,
  },
},
{
  toJSON: {
      virtuals: true,
      getters: true,
  },
  id: false,
});

userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
  next();
});

userSchema.methods.isCorrectPassword = async function (password) {
  const match = await bcrypt.compare(password, this.password);
  return match;
};

userSchema.methods.formatCreateddAt = function() {
  return this.createdAt.toLocaleDateString() + ", " + this.createdAt.toLocaleTimeString('en-US') + `, GMT+` + this.createdAt.getTimezoneOffset()/-60;
};

userSchema.methods.formatUpdatedAt = function() {
  return this.updatedAt.toLocaleDateString() + ", " + this.updatedAt.toLocaleTimeString('en-US') + `, GMT+` + this.updatedAt.getTimezoneOffset()/-60;
};

userSchema.virtual('fullName').get( function () {
  return `${this.firstName} ${this.lastName}`;
});

const User = mongoose.model('User', userSchema);

module.exports = User;
