const paypal = require('paypal-rest-sdk');
const Product = require("../models/productModel");
const User = require("../models/userModel");
const Color = require("../models/colorModel");
const Cart = require("../models/cartModel");
const Order = require("../models/orderModel");

const { PAYPAL_MODE, PAYPAL_CLIENT_KEY, PAYPAL_SECRET_KEY } = process.env;

paypal.configure({
    'mode': PAYPAL_MODE, //sandbox or live
    'client_id': PAYPAL_CLIENT_KEY,
    'client_secret': PAYPAL_SECRET_KEY
});

const renderBuyPage = async (req, res) => {

    try {

        res.render('index');

    } catch (error) {
        console.log(error.message);
    }

}

const payProduct = async (req, res) => {
    const carts = req.body;
    const { _id } = req.user;
    let totalPrice = 0;
    console.log(carts.items)
    let items_ = await Promise.all(carts.items.map(async (item) => {
        let findProduct = await Product.findById(item.prodId);

        if (findProduct) {
            let obj = {
                "product": item.prodId,
                "color": item.color,
                "price": findProduct.price * item.count,
                "size": item.size,
                "count": item.count // Assuming `count` is defined somewhere
            };
            totalPrice += obj.price; // Add the item price to the total price
            return obj;
        }
    }));
    console.log(items_)
    let price = totalPrice + ".00";

    try {
        const create_payment_json = {
            "intent": "sale",
            "payer": {
                "payment_method": "paypal"
            },
            "redirect_urls": {
                "return_url": "http://localhost:3000/success",
                "cancel_url": "http://localhost:3000/cancel"
            },
            "transactions": [{
                "amount": {
                    "currency": "USD",
                    "total": price // Total of all items' prices
                },
                "description": "Purchase of multiple items"
            }]
        };
        let pay;
        paypal.payment.create(create_payment_json, async function (error, payment) {
            if (error) {
                throw error;
            } else {
                console.log(payment)
                for (let i = 0; i < payment.links.length; i++) {
                    if (payment.links[i].rel === 'approval_url') {

                        let order = await Order.create({
                            products: items_,
                            paymentIntent: {
                                paymentId: payment.id,
                                intent: payment.intent,
                                payer: payment.payer,
                                transactions: payment.transactions,
                                create_time:payment.create_time
                            },
                            orderby: _id
                        });
                        order.save();
                        console.log(order)
                        res.json(payment.links[i]);

                    }
                }
            }
        });

    } catch (error) {
        console.log(error.message);
    }
}


const successPage = async (req, res) => {

    try {

        const payerId = req.query.PayerID;
        const paymentId = req.query.paymentId;

        const execute_payment_json = {
            "payer_id": payerId,
            "transactions": [{
                "amount": {
                    "currency": "USD",
                    "total": "25.00"
                }
            }]
        };

        paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
            if (error) {
                console.log(error.response);
                throw error;
            } else {
                console.log(JSON.stringify(payment));
                res.render('success');
            }
        });

    } catch (error) {
        console.log(error.message);
    }

}

const cancelPage = async (req, res) => {

    try {

        res.render('cancel');

    } catch (error) {
        console.log(error.message);
    }

}

module.exports = {
    renderBuyPage,
    payProduct,
    successPage,
    cancelPage
}