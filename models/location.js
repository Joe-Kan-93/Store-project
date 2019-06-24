const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//*user register schema structure
const locationSchema = new Schema(
  {
    location: {
      type: {
        type: String
      },
      coordinates: [Number]
    }
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
