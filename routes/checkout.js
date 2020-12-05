const express = require("express");
const router = express.Router();
const stripe = require('stripe')('sk_test_51Ht0mwFHEiDr6rf2Wa8PyVCaNfDXqKBOWvL5GwlAk3vNnDr8oY9eYCOM46i4WCq4nhhxXMGKQKr89x5U9xL718sN00znAUu7JK');

const Purchase = require("../models/purchase.model");
const Listing = require("../models/listing");

router.post('/create-checkout-session', async (req, res) => {
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
            {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: req.body.title,
                    },
                    unit_amount: parseInt(req.body.price) * 100+ 1,
                },
                quantity: 1,
            },
        ],
        mode: 'payment',
        success_url: `https://secondhand-nyu.netlify.app/order/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: 'https://secondhand-nyu.netlify.app/home',
    });

    //await Listing.findByIdAndUpdate(req.body.itemId,{status:"unavailable"},{ new: true });

    const p = {
        buyer: req.body.buyer,
        item: req.body.itemId,
        stripeCheckoutId: session.id
    }

    let newpurchase = await Purchase.create(p);

    res.json({ id: session.id });
});

module.exports = router;