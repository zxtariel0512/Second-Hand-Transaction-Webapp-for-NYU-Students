const mongoose = require("mongoose");

const ListingSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: String,
    image_url: String,
    price: String,
    created_date: {
        type: Date,
        default: Date.now
    },
    expire_date: Date,
    payment: String,
    shipment: String,
    category_id: String
})




module.exports = mongoose.model("Listing", ListingSchema)