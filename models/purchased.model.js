const mongoose = require('mongoose');

const PurchasedSchema = new mongoose.Schema({

    buyernetid:{
        type:String,
        require:true
    },
    
    itemId:{
        type: mongoose.Schema.Types.ObjectID,
        ref:'listing',
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
    
})

module.exports = mongoose.model("Purchased", PurchasedSchema)