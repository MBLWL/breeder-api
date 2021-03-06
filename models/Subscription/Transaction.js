const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var idvalidator = require('mongoose-id-validator');

//subscriber details
const TransactionSchema = mongoose.Schema({
    breederId: {
        type:Schema.Types.ObjectId,
        ref: 'User'
    },
    subscriptionId: {
        type:Schema.Types.ObjectId,
        ref: 'Subscription'
    },
    payment_gateway:{type:String},
    fromDate:{type:Date},
    toDate:{type:Date},
    email:String,
    description:{type:String },
    customer:String,
    created:Number,
    payment_method_detail:String,
    brand:String,
    country:String,
    //for save populate
    price:{type:Number },
    currency:{type:String},
    allowedAnimal:{type:Number},
    allowedEmp:{type:Number},
    name:{type:String}
    ///
},{timestamps: true})


TransactionSchema.plugin(idvalidator);
const Transaction= mongoose.model('Transaction', TransactionSchema);

module.exports = { Transaction }