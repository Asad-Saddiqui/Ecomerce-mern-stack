const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var contactSchema = new mongoose.Schema(
    {
        message: {
            type: String,
            trim: true,
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    },
    { timestamps: true }
);

//Export the model
module.exports = mongoose.model("Contact", contactSchema);
