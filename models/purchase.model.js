const mongoose = require('mongoose');

const PurchaseSchema = new mongoose.Schema({
    buyer: {
        type:String,
        require: true
    },
    item:{
        type: mongoose.Schema.Types.ObjectID,
        ref:'Listing',
        require: true
    },
    stripeCheckoutId:{
        type: String,
        require: true
    },
    created_date: {
        type: Date,
        default: Date.now
    },
    completed: {
        type: Boolean,
        default: false
    }

})

module.exports = mongoose.model("Purchase", PurchaseSchema)
