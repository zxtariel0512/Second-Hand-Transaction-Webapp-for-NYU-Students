const mongoose = require("mongoose");

var RequestSchema = new mongoose.Schema({
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
    budget_price: String,
    created_date: {
        type: Date,
        default: Date.now
    },
    expire_date: Date,
    payment: String,
    shipment: String,
    category_id: String
})

module.exports = mongoose.model("request", RequestSchema)