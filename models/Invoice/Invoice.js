const mongoose = require('mongoose');
var idvalidator = require('mongoose-id-validator');
const AnimalArraySchema = mongoose.Schema({ animalId: { type: mongoose.Schema.Types.ObjectId, ref: 'Animal' , required: true}, price: {type: Number, required: true} });
const InvoiceSchema = mongoose.Schema({
    type: {type: String}, // sale etc
    // remove breederid
    saleId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Sale',required:true
    },// Who created this invoice
    invoiceNumber: {type: String, required: true},
    buyerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    sellerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }, //belongs to which user
    breederId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }, //belongs to which breederId
    isRemoved: {
        type: Boolean,
        default: false,
    },
    installmentId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Installment',
    }
}, { timestamps: true })

InvoiceSchema.plugin(idvalidator);
const Invoice = mongoose.model('Invoice', InvoiceSchema);

module.exports = { Invoice }