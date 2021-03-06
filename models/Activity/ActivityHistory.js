const mongoose = require("mongoose");

//for ActivityHistory create to hold info
const ActivityHistorySchema = mongoose.Schema(
  {
    name: { type: String },
    categoryType: { type: String },
    description: { type: String },
    assignToType: {
        type: String,
        enum: ["Animal", "Group"],
        default: "Animal",
    },
    categoryName: { type: String },

    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      require: true,
    },

    addedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },

    groupId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Group",
      },
    ],
    animalId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Animal",
      },
    ],
    // employeeId: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "User",
    //   },
    // ],
    breederId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
    date: { type: Date },
    pending:{type:Boolean,default:false},
  },
  { timestamps: true }
);

const ActivityHistory = mongoose.model("ActivityHistory", ActivityHistorySchema);

module.exports = { ActivityHistory };
