   const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
   //Object Prototype
   shippingInfo: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      country: { type: String, required: true },
      phoneNo: { type: Number, required: true },
   },

   orderItems: [
      {
         name: {
            type: String,
            required: true,
         },
         price: {
            type: String,
            required: true,
         },
         quantity: {
            type: Number,
            required: true,
         },
         product: {
            type: mongoose.Schema.ObjectId,
            ref: 'Product',
            required: true,
         },
         image: {
            type: String,
            required: true,
         },
      },
   ],

   user: {
      type: mongoose.Schema.ObjectId,
      ref: 'users',
      required: true,
   },
   itemsPrice: {
      type: Number,
      default: 0,
      required: true,
   },
   taxPrice: {
      type: Number,
      default: 0,
      required: true,
   },
   shippingPrice: {
      type: Number,
      default: 0,
      required: true,
   },
   totalPrice: {
      type: Number,
      default: 0,
      required: true,
   },
   orderStatus: {
      type: String,
      required: true,
      default: 'Processing',
   },
   deliveredAt: Date,
   createdAt: {
      type: Date,
      default: Date.now,
   },
});

module.exports = mongoose.model('orders', orderSchema);
