const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//*user register schema structure
const userSchema = new Schema(
  {
    username: {
      type: String
    },

    firstName: {
      type: String,
      uppercase: true
    },

    lastName: {
      type: String,
      uppercase: true
    },

    age: {
      type: Number,
      min: 18,
      max: 80,
      required: true
    },

    email: {
      type: String,
      // unique: true,
      trim: true,
      required: true
    },

    password: {
      type: String,
      required: true
    },

    route: { type: String, required: true },
    street_number: { type: Number, required: true },
    locality: { type: String, required: true },
    postal_code: { type: Number, required: true },
    administrative_area_level_1: { type: String, required: true },
    country: { type: String, required: true },

    registered: Date,

    resetPasswordToken: String,
    resetPasswordExpires: Date
  },
  {
    toObject: {
      transform: function(doc, ret) {
        delete ret._id;
      }
    },
    toJSON: {
      transform: function(doc, ret) {
        delete ret._id;
      }
    }
  }
);

module.exports = mongoose.model("User", userSchema);
