const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//*store schema structure
const storeSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },

    email: {
      type: String,
      required: true
    },

    des: {
      type: String,
      required: true
    },

    route: { type: String, required: true },
    street_number: { type: Number, required: true },
    locality: { type: String, required: true },
    postal_code: { type: Number, required: true },
    administrative_area_level_1: { type: String, required: true },
    country: { type: String, required: true },
    latitude: [Number],
    longitude: [Number],

    // tags: {
    //   type: String,
    //   enum: ["Business", "Marketing", "Freelancer"]
    // },
    tags: [String],

    updated: Date
  },
  {
    // timestamps: true,
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

module.exports = mongoose.model("Store", storeSchema);
